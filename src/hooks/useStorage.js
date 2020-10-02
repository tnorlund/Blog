import { useEffect, useState } from 'react'

export const useStorage = (storage, key, initialValue, options = {}) => {
  // The storage here can be:
  // - Local
  // - Session
  const { deleteKeyIfValueIs = null } = options

  // The useState function handles the creation of the state.
  const [value, setValue] = useState(() => {
    // Server-side rendering does not use the storage.
    if (typeof window == `undefined`) return initialValue
    try {
      const value = storage[key]
      // Parse the JSON if it exists or return the value.
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      // If an error happens, return the initial value.
      console.log(error)
      return initialValue
    }
  })

  useEffect(() => {
    // If the key is not found in the storage, set it to the initialValue given
    // to ensure that it is stored even when setStoredValue is not called.
    if (storage[key] === undefined) storage[key] = JSON.stringify(value)

    // The CustomEvent is triggered by a call to useStorage. The new value is 
    // stored in event.detail.
    const cb = event => setValue(event.detail)

    // Register the event listeners on the initial state creation. This will 
    // allow events to be triggered by setValue and keeping the values in sync 
    // between multiple calls to useStorage with the same key.
    document.addEventListener(`storage:${key}Change`, cb)
    return () => document.removeEventListener(`storage:${key}Change`, cb)
  }, [value, key, storage])

  const setStoredValue = newValue => {
    if (newValue === value) return

    // Conform to useState API by allowing newValue to be a function which 
    // takes the current value.
    if (newValue instanceof Function) newValue = newValue(value)

    const event = new CustomEvent(`storage${key}Change`, {
      detail: newValue,
    })
    document.dispatchEvent(event)

    if (newValue === deleteKeyIfValueIs) delete storage[key]
    else storage[key] = JSON.stringify(newValue)

    setValue(newValue)
  }
  return [value, setStoredValue]
}

export const useLocalStorage = (...args) =>
  useStorage(typeof window !== `undefined` && localStorage, ...args)

export const useSesscionStorage = (...args) =>
  useStorage(typeof window !== `undefined` && sessionStorage, ...args)
import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'

/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )

const SCROLL_INDEX: number = 50

/**
 * @typedef scrollElement
 * @param {number} scrollDateTime The position of the viewport within the 
 *   window.
 */
interface scrollElement {
  id: string,
  date: number,
  title: string,
  slug: string,
  app: string | undefined,
  y: number | undefined,
  x: number | undefined,
  height: number | undefined,
  width: number | undefined
}

/**
 * @typedef scrollBuffer
 * @param {scrollElement} scrollIndex The index used to append the scroll 
 *   elements to.
 */
interface scrollBuffer {
  [scrollIndex: number]: [scrollElement] | []
}

/**
 * @typedef privacy
 * @param {boolean} browser Whether to store the browser's user agent.
 * @param {boolean} scrollPosition Whether to store the scroll position.
 * @param {boolean} windowSize Whether to store the window size.
 * @param {boolean} shownWindow Whether the user has seen the privacy modal
 *   view.
 */
interface privacy {
  browser: boolean,
  scrollPosition: boolean,
  windowSize: boolean,
  shownWindow: boolean,
}

/**
 * Creates a new buffer to store the scroll positions of the page.
 * @param {scrollBuffer} scroll_buffer The object used to store the scroll positions.
 * @param {Number} buffer_index The key of the current buffer used to store the
 *   scroll position.
 * @returns The new key of the current buffer.
 */
export const IncrementBuffer = ( scroll_buffer: scrollBuffer, buffer_index: number ) => {
  buffer_index++
  scroll_buffer[ buffer_index ] = []
  return buffer_index
}

/**
 * Handles whether to show the privacy modal view
 * @param {privacy} privacy The data the visitor has agreed to share.
 * @param {Function} setPrivacyShow The function used to show the privacy
 *   agreement modal view.
 * @param {Function} setPrivacy The function used to store the privacy
 *   settings to the session storage.
 */
export const handlePrivacy = ( privacy: privacy, setPrivacyShow: Function, setPrivacy: Function ) => {
  if (
    window.scrollY > 100 &&
      ( !privacy || ( privacy && privacy.shownWindow == false ) )
  ) {
    setPrivacyShow( true )
    setPrivacy( { ...privacy, shownWindow: true } )
  }
}

/**
 * Handles a scroll event by determining whether to use the Kinesis Firehose
 * to send the visitor's data.
 *
 * @param {privacy} privacy The privacy data the visitor has agreed to share.
 * @param {scrollBuffer} scroll_buffer The object used to store the scroll positions.
 * @param {Number} buffer_index The key of the current buffer used to store the
 * @param {class} Analytics The Amplify class used to send the data through the
 *   Kinesis Firehose stream.
 * @param {String} visitorKey The unique ID that identifies the visitor.
 * @param {String} page_title The title of the page the visitor is at.
 * @param {String} page_slug The slug of the page the visitor is at.
 */
export const handleScroll = (
  privacy: privacy, scroll_buffer: scrollBuffer, buffer_index: number, 
  visitorKey: string, page_title: string, page_slug: string
) => {
  /* When the visitor has reached a point in the page, record the buffer */
  if ( window.scrollY % SCROLL_INDEX == 0 ) {
    try {
      buffer_index = IncrementBuffer( scroll_buffer, buffer_index )
      Analytics.record( {
        data: scroll_buffer[ buffer_index - 1 ],
        streamName: process.env.GATSBY_ANALYTICS_FIREHOSE
      }, `AWSKinesisFirehose` )
    } catch( error ) { console.warn( `error`, error ) }
  }
  /* Append a scroll position to the buffer */
  else {
    /** The scroll data sent to Kinesis Firehose for analytics */
    const data : scrollElement = {
      id: visitorKey,
      date: new Date().getTime(),
      title: page_title,
      slug: page_slug,
      app: privacy && privacy.browser? window.navigator.userAgent : undefined,
      y: privacy && privacy.scrollPosition? window.scrollY : undefined,
      x: privacy && privacy.scrollPosition? window.scrollX : undefined,
      height: privacy && privacy.windowSize? window.screen.height : undefined,
      width: privacy && privacy.windowSize ? window.screen.width : undefined
    }
    scroll_buffer[ buffer_index ].push( data )
  }
  return buffer_index
}
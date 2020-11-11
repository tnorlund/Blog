/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPerformance = /* GraphQL */ `
  mutation CreatePerformance(
    $input: CreatePerformanceInput!
    $condition: ModelPerformanceConditionInput
  ) {
    createPerformance(input: $input, condition: $condition) {
      id
      buffer
      cpuSerial
      dateTime
      fpsReal
      fpsRequested
      numberFrames
      runTime
      timeRequested
      createdAt
      updatedAt
    }
  }
`;
export const updatePerformance = /* GraphQL */ `
  mutation UpdatePerformance(
    $input: UpdatePerformanceInput!
    $condition: ModelPerformanceConditionInput
  ) {
    updatePerformance(input: $input, condition: $condition) {
      id
      buffer
      cpuSerial
      dateTime
      fpsReal
      fpsRequested
      numberFrames
      runTime
      timeRequested
      createdAt
      updatedAt
    }
  }
`;
export const deletePerformance = /* GraphQL */ `
  mutation DeletePerformance(
    $input: DeletePerformanceInput!
    $condition: ModelPerformanceConditionInput
  ) {
    deletePerformance(input: $input, condition: $condition) {
      id
      buffer
      cpuSerial
      dateTime
      fpsReal
      fpsRequested
      numberFrames
      runTime
      timeRequested
      createdAt
      updatedAt
    }
  }
`;

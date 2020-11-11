/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPerformance = /* GraphQL */ `
  query GetPerformance($id: ID!) {
    getPerformance(id: $id) {
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
export const listPerformances = /* GraphQL */ `
  query ListPerformances(
    $filter: ModelPerformanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPerformances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        buffer
        cpuSerial
        dateTime
        fpsReal
        fpsRequested
        numberFrames
        runTime
        timeRequested
        # createdAt
        # updatedAt
      }
      nextToken
    }
  }
`;

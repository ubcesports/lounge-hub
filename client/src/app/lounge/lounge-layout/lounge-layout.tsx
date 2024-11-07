/*
 * Below is the layout of the lounge. The lounge is represented as a 9x5 grid where each cell
 * may represent a PC station. The position of the i-th numbered PC station is given by pcPositions[i],
 * and is in the form [x, y] where x is the column and y is the row. New PCs may be added by changing 
 * the NUM_PCS constant in client/src/store/pc-store.ts and adding a new position to the pcPositions array
 * and the intended index. Keep in mind that the Cab and Check-in PC are also represented in this layout 
 * as PCs 20 and 21, and are treated as special cases in the PCStation component. Therefore, if you add 
 * a new PC, make sure to update the PCStation component accordingly.
 * 
 * For a visual representation of the lounge layout, refer to layout.md in the same directory as this file.
 */

export const pcPositions = [
  [5, 5], // Position for PC 1
  [5, 6], // Position for PC 2
  [5, 7], // Position for PC 3
  [5, 8], // Position for PC 4
  [2, 9], // Position for PC 5
  [1, 9], // Position for PC 6
  [1, 7], // Position for PC 7
  [2, 7], // Position for PC 8
  [3, 6], // Position for PC 9
  [2, 6], // Position for PC 10
  [1, 6], // Position for PC 11
  [1, 4], // Position for PC 12
  [2, 4], // Position for PC 13
  [3, 3], // Position for PC 14
  [2, 3], // Position for PC 15
  [1, 3], // Position for PC 16
  [1, 1], // Position for PC 17
  [2, 1], // Position for PC 18
  [3, 1], // Position for PC 19
  [5, 1], // check-in PC
  [5, 9], // cab
];

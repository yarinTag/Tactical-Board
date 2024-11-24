export function getFormationVertically(formation: string) {
  switch (formation) {
    case '4-2-3-1':
      return [
        { id: 'GK', x: 160, y: 435 }, // GK
        { id: 'DR', x: 275, y: 350 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 120, y: 365 }, // DCL
        { id: 'DL', x: 45, y: 350 }, // DL
        { id: 'RM', x: 295, y: 190 }, // RM
        { id: 'MCR', x: 210, y: 250 }, // MCR
        { id: 'MCL', x: 105, y: 250 }, // MCL
        { id: 'ML', x: 25, y: 190 }, // ML
        { id: 'AMC', x: 160, y: 140 }, // AMC
        { id: 'ST', x: 160, y: 60 }, // ST
      ];
    case '4-4-2':
      return [
        { id: 'GK', x: 160, y: 435 }, // GK
        { id: 'DR', x: 275, y: 350 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 120, y: 365 }, // DCL
        { id: 'DL', x: 45, y: 350 }, // DL
        { id: 'RM', x: 295, y: 230 }, // RM
        { id: 'MCR', x: 210, y: 250 }, // MCR
        { id: 'MCL', x: 105, y: 250 }, // MCL
        { id: 'ML', x: 25, y: 230 }, // ML
        { id: 'ST', x: 200, y: 60 }, // ST
        { id: 'ST', x: 120, y: 60 }, // ST
      ];
    case '4-4-1-1':
      return [
        { id: 'GK', x: 160, y: 435 }, // GK
        { id: 'DR', x: 275, y: 350 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 120, y: 365 }, // DCL
        { id: 'DL', x: 45, y: 350 }, // DL
        { id: 'RM', x: 295, y: 230 }, // RM
        { id: 'MCR', x: 210, y: 250 }, // MCR
        { id: 'MCL', x: 105, y: 250 }, // MCL
        { id: 'AML', x: 25, y: 230 }, // ML
        { id: 'AMC', x: 160, y: 140 }, // AMC
        { id: 'ST', x: 160, y: 60 }, // ST
      ];
    case '4-3-3':
      return [
        { id: 'GK', x: 160, y: 435 }, // GK
        { id: 'DR', x: 275, y: 350 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 120, y: 365 }, // DCL
        { id: 'DL', x: 45, y: 350 }, // DL
        { id: 'DMC', x: 160, y: 270 }, // DMC
        { id: 'MCR', x: 210, y: 200 }, // MCR
        { id: 'MCL', x: 105, y: 200 }, // MCL
        { id: 'RW', x: 295, y: 100 }, // RW
        { id: 'LW', x: 25, y: 100 }, // LW
        { id: 'ST', x: 160, y: 60 }, // ST
      ];
    case '3-5-2':
      return [
        { id: 'GK', x: 160, y: 435 }, // GK
        { id: 'WBR', x: 275, y: 300 }, // WBR
        { id: 'DCR', x: 220, y: 365 }, // DCR
        { id: 'DC', x: 160, y: 365 }, // DC
        { id: 'DCL', x: 100, y: 365 }, // DCL
        { id: 'WBL', x: 45, y: 300 }, // WBL
        { id: 'MCR', x: 230, y: 210 }, // MCR
        { id: 'MC', x: 160, y: 210 }, // MC
        { id: 'MCL', x: 90, y: 210 }, // MCL
        { id: 'STL', x: 120, y: 60 }, // STL
        { id: 'STR', x: 200, y: 60 }, // STR
      ];
    default:
      return [
        { id: 'GK', x: 160, y: 435 }, // GK
        { id: 'DR', x: 275, y: 350 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 120, y: 365 }, // DCL
        { id: 'DL', x: 45, y: 350 }, // DL
        { id: 'RM', x: 295, y: 190 }, // RM
        { id: 'MCR', x: 210, y: 250 }, // MCR
        { id: 'MCL', x: 105, y: 250 }, // MCL
        { id: 'ML', x: 25, y: 190 }, // ML
        { id: 'AMC', x: 160, y: 140 }, // AMC
        { id: 'ST', x: 160, y: 60 }, // ST
      ];
  }
}

export function getFormationHorizontally(formation: string) {
  switch (formation) {
    case '4-2-3-1':
      return [
        { id: 'GK', x: 5, y: 240 }, // GK
        { id: 'DR', x: 120, y: 365 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 280, y: 365 }, // DCL
        { id: 'DL', x: 360, y: 365 }, // DL
        { id: 'RM', x: 105, y: 250 }, // RM
        { id: 'MCR', x: 200, y: 250 }, // MCR
        { id: 'MCL', x: 295, y: 250 }, // MCL
        { id: 'ML', x: 390, y: 250 }, // ML
        { id: 'AMC', x: 245, y: 140 }, // AMC
        { id: 'ST', x: 245, y: 60 }, // ST
      ];
    case '4-4-2':
      return [
        { id: 'GK', x: 5, y: 240 }, // GK
        { id: 'DR', x: 120, y: 365 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 280, y: 365 }, // DCL
        { id: 'DL', x: 360, y: 365 }, // DL
        { id: 'RM', x: 105, y: 250 }, // RM
        { id: 'MCR', x: 200, y: 250 }, // MCR
        { id: 'MCL', x: 295, y: 250 }, // MCL
        { id: 'ML', x: 390, y: 250 }, // ML
        { id: 'ST', x: 200, y: 60 }, // ST
        { id: 'ST', x: 320, y: 60 }, // ST
      ];
    case '4-4-1-1':
      return [
        { id: 'GK', x: 5, y: 240 }, // GK
        { id: 'DR', x: 120, y: 365 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 280, y: 365 }, // DCL
        { id: 'DL', x: 360, y: 365 }, // DL
        { id: 'RM', x: 105, y: 250 }, // RM
        { id: 'MCR', x: 200, y: 250 }, // MCR
        { id: 'MCL', x: 295, y: 250 }, // MCL
        { id: 'AML', x: 390, y: 250 }, // AML
        { id: 'AMC', x: 245, y: 140 }, // AMC
        { id: 'ST', x: 245, y: 60 }, // ST
      ];
    case '4-3-3':
      return [
        { id: 'GK', x: 5, y: 240 }, // GK
        { id: 'DR', x: 120, y: 365 }, // DR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DCL', x: 280, y: 365 }, // DCL
        { id: 'DL', x: 360, y: 365 }, // DL
        { id: 'DMC', x: 245, y: 250 }, // DMC
        { id: 'MCR', x: 200, y: 160 }, // MCR
        { id: 'MCL', x: 295, y: 160 }, // MCL
        { id: 'RW', x: 105, y: 60 }, // RW
        { id: 'LW', x: 390, y: 60 }, // LW
        { id: 'ST', x: 245, y: 60 }, // ST
      ];
    case '3-5-2':
      return [
        { id: 'GK', x: 5, y: 240 }, // GK
        { id: 'WBR', x: 120, y: 365 }, // WBR
        { id: 'DCR', x: 200, y: 365 }, // DCR
        { id: 'DC', x: 280, y: 365 }, // DC
        { id: 'DCL', x: 360, y: 365 }, // DCL
        { id: 'WBL', x: 105, y: 250 }, // WBL
        { id: 'MCR', x: 200, y: 160 }, // MCR
        { id: 'MC', x: 295, y: 160 }, // MC
        { id: 'MCL', x: 390, y: 250 }, // MCL
        { id: 'STL', x: 160, y: 60 }, // STL
        { id: 'STR', x: 320, y: 60 }, // STR
      ];
    case '3-4-3':
      return [
        { id: 'GK', x: 5, y: 290 },
        { id: 'DCR', x: 110, y: 450 },
        { id: 'DC', x: 240, y: 365 },
        { id: 'DCL', x: 320, y: 365 },
        { id: 'RM', x: 110, y: 290 },
        { id: 'MCR', x: 200, y: 250 },
        { id: 'MCL', x: 295, y: 250 },
        { id: 'ML', x: 390, y: 250 },
        { id: 'RW', x: 110, y:130 },
        { id: 'ST', x: 245, y: 60 },
        { id: 'LW', x: 390, y: 60 },
      ];
    case '5-3-2':
      return [
        { id: 'GK', x: 5, y: 240 },
        { id: 'WBR', x: 120, y: 365 },
        { id: 'DCR', x: 200, y: 365 },
        { id: 'DC', x: 245, y: 365 },
        { id: 'DCL', x: 290, y: 365 },
        { id: 'WBL', x: 360, y: 365 },
        { id: 'MCR', x: 180, y: 250 },
        { id: 'MC', x: 245, y: 250 },
        { id: 'MCL', x: 310, y: 250 },
        { id: 'STL', x: 180, y: 60 },
        { id: 'STR', x: 310, y: 60 },
      ];
    default:
      return getFormationHorizontally('4-4-2');
  }
}

export const formationsKeys: { [key: string]: [number, number][] } = {
  '4-4-2': [
    [0, 0], // GK
    [50, 70], // RB
    [150, 70], // LB
    [50, 170], // CB
    [150, 170], // CB
    [50, 270], // RM
    [150, 270], // LM
    [100, 370], // CM
    [20, 420], // ST
    [100, 420], // ST
    [0, 0], // Substituted Goalkeeper or Reserve Player
  ],
  '4-3-3': [
    [100, 20], // GK
    [50, 70], // RB
    [150, 70], // LB
    [50, 170], // CB
    [150, 170], // CB
    [100, 270], // CDM
    [50, 370], // CM
    [150, 370], // CM
    [20, 420], // CF
    [100, 420], // LW
    [180, 420], // RW
  ],
  '3-5-2': [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [4, 3],
    [6, 3],
    [5, 4],
    [3, 5],
    [7, 5],
    [5, 6],
    [4, 7], // Goalkeeper position
  ],
  '3-4-3': [
    [2, 1],
    [4, 1],
    [6, 1],
    [3, 3],
    [5, 3],
    [1, 4],
    [3, 4],
    [5, 4],
    [7, 4],
    [4, 6],
    [4, 7], // Goalkeeper position
  ],
  '4-2-3-1': [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [4, 3],
    [6, 3],
    [8, 3],
    [5, 4],
    [3, 5],
    [7, 5],
    [4, 7], // Goalkeeper position
  ],
  // Add more formations here
};

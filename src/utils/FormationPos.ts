export function getFormation(formation: string) {
  switch (formation) {
    case '4-4-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '12%', x: '20%' },
        { id: 'LCB', y: '35%', x: '20%' },
        { id: 'RCB', y: '65%', x: '20%' },
        { id: 'RB', y: '88%', x: '20%' },
        { id: 'LM', y: '12%', x: '45%' },
        { id: 'LCM', y: '35%', x: '45%' },
        { id: 'RCM', y: '65%', x: '45%' },
        { id: 'RM', y: '88%', x: '45%' },
        { id: 'LS', y: '35%', x: '70%' },
        { id: 'RS', y: '65%', x: '70%' },
      ];

    case '4-1-4-1':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '12%', x: '20%' },
        { id: 'LCB', y: '35%', x: '20%' },
        { id: 'RCB', y: '65%', x: '20%' },
        { id: 'RB', y: '88%', x: '20%' },
        { id: 'CDM', y: '50%', x: '35%' },
        { id: 'LM', y: '12%', x: '50%' },
        { id: 'LCM', y: '35%', x: '50%' },
        { id: 'RCM', y: '65%', x: '50%' },
        { id: 'RM', y: '88%', x: '50%' },
        { id: 'ST', y: '50%', x: '70%' },
      ];

    case '4-2-3-1':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '12%', x: '20%' },
        { id: 'LCB', y: '35%', x: '20%' },
        { id: 'RCB', y: '65%', x: '20%' },
        { id: 'RB', y: '88%', x: '20%' },
        { id: 'LDM', y: '35%', x: '40%' },
        { id: 'RDM', y: '65%', x: '40%' },
        { id: 'LAM', y: '18%', x: '55%' },
        { id: 'CAM', y: '50%', x: '55%' },
        { id: 'RAM', y: '82%', x: '55%' },
        { id: 'S', y: '50%', x: '70%' },
      ];

    case '4-3-3':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '12%', x: '20%' },
        { id: 'LCB', y: '35%', x: '20%' },
        { id: 'RCB', y: '65%', x: '20%' },
        { id: 'RB', y: '88%', x: '20%' },
        { id: 'LM', y: '20%', x: '45%' },
        { id: 'CM', y: '50%', x: '45%' },
        { id: 'RM', y: '80%', x: '45%' },
        { id: 'LW', y: '15%', x: '67%' },
        { id: 'CF', y: '50%', x: '72%' },
        { id: 'RW', y: '85%', x: '67%' },
      ];

    case '3-4-3':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LCB', y: '20%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '80%', x: '18%' },
        { id: 'LM', y: '12%', x: '45%' },
        { id: 'LCM', y: '35%', x: '45%' },
        { id: 'RCM', y: '65%', x: '45%' },
        { id: 'RM', y: '88%', x: '45%' },
        { id: 'LW', y: '20%', x: '67%' },
        { id: 'CF', y: '50%', x: '72%' },
        { id: 'RW', y: '80%', x: '67%' },
      ];

    case '3-5-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LCB', y: '20%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '80%', x: '18%' },
        { id: 'LM', y: '12%', x: '40%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'CM', y: '50%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'RM', y: '88%', x: '40%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '3-1-4-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LCB', y: '20%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '80%', x: '18%' },
        { id: 'CDM', y: '50%', x: '35%' },
        { id: 'LM', y: '12%', x: '45%' },
        { id: 'LCM', y: '30%', x: '45%' },
        { id: 'RCM', y: '70%', x: '45%' },
        { id: 'RM', y: '88%', x: '45%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '3-4-1-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LCB', y: '20%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '80%', x: '18%' },
        { id: 'LM', y: '12%', x: '40%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'RM', y: '88%', x: '40%' },
        { id: 'CAM', y: '50%', x: '60%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '3-4-2-1':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LCB', y: '20%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '80%', x: '18%' },
        { id: 'LM', y: '12%', x: '40%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'CM', y: '50%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'RM', y: '88%', x: '40%' },
        { id: 'LAM', y: '30%', x: '60%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '3-5-1-1':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LCB', y: '20%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '80%', x: '18%' },
        { id: 'LM', y: '12%', x: '40%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'CM', y: '50%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'RM', y: '88%', x: '40%' },
        { id: 'CAM', y: '50%', x: '60%' },
        { id: 'CF', y: '50%', x: '80%' },
      ];
    case '4-1-2-1-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '15%', x: '18%' },
        { id: 'LCB', y: '40%', x: '18%' },
        { id: 'RCB', y: '65%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'CDM', y: '50%', x: '32%' },
        { id: 'LM', y: '50%', x: '60%' },
        { id: 'LCM', y: '30%', x: '45%' },
        { id: 'RCM', y: '70%', x: '45%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '4-1-3-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '15%', x: '18%' },
        { id: 'LCB', y: '40%', x: '18%' },
        { id: 'RCB', y: '65%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'CDM', y: '50%', x: '35%' },
        { id: 'LM', y: '15%', x: '45%' },
        { id: 'LCM', y: '30%', x: '45%' },
        { id: 'CM', y: '50%', x: '45%' },
        { id: 'RCM', y: '70%', x: '45%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '4-2-4':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '15%', x: '18%' },
        { id: 'LCB', y: '40%', x: '18%' },
        { id: 'RCB', y: '65%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'LM', y: '15%', x: '70%' },
        { id: 'LCM', y: '30%', x: '45%' },
        { id: 'RCM', y: '70%', x: '45%' },
        { id: 'RM', y: '88%', x: '70%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '4-3-1-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '15%', x: '18%' },
        { id: 'LCB', y: '40%', x: '18%' },
        { id: 'RCB', y: '65%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'LDM', y: '30%', x: '35%' },
        { id: 'LCM', y: '50%', x: '35%' },
        { id: 'CM', y: '70%', x: '35%' },
        { id: 'RCM', y: '70%', x: '35%' },
        { id: 'CAM', y: '50%', x: '60%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '4-4-1-1':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '15%', x: '18%' },
        { id: 'LCB', y: '40%', x: '18%' },
        { id: 'RCB', y: '65%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'LM', y: '15%', x: '40%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'CM', y: '50%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'RM', y: '88%', x: '40%' },
        { id: 'CF', y: '50%', x: '60%' },
      ];
    case '4-5-1':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '15%', x: '18%' },
        { id: 'LCB', y: '40%', x: '18%' },
        { id: 'RCB', y: '65%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'LM', y: '15%', x: '40%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'CM', y: '50%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'RM', y: '88%', x: '40%' },
        { id: 'CF', y: '50%', x: '60%' },
      ];
    case '5-3-2':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '10%', x: '18%' },
        { id: 'LCB', y: '30%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '70%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'CM', y: '50%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'LS', y: '30%', x: '70%' },
        { id: 'RS', y: '70%', x: '70%' },
      ];
    case '5-2-3':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '10%', x: '18%' },
        { id: 'LCB', y: '30%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '70%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'LM', y: '50%', x: '70%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'RM', y: '70%', x: '40%' },
        { id: 'LS', y: '20%', x: '70%' },
        { id: 'RS', y: '80%', x: '70%' },
      ];
    case '5-4-1':
      return [
        { id: 'GK', y: '50%', x: '3%' },
        { id: 'LB', y: '10%', x: '18%' },
        { id: 'LCB', y: '30%', x: '18%' },
        { id: 'CB', y: '50%', x: '18%' },
        { id: 'RCB', y: '70%', x: '18%' },
        { id: 'RB', y: '90%', x: '18%' },
        { id: 'LM', y: '15%', x: '40%' },
        { id: 'LCM', y: '30%', x: '40%' },
        { id: 'RCM', y: '70%', x: '40%' },
        { id: 'RM', y: '88%', x: '40%' },
        { id: 'CF', y: '50%', x: '60%' },
      ];
  }
}

export function getFormationHorizontally(formation: string) {
  const pitchWidth = 700;
  const pitchHeight = 500;

  const originalFormation = getFormation(formation)!;
  return originalFormation.map((position) => ({
    id: position.id,
    x: (parseFloat(position.x.toString()) * pitchWidth) / 100,
    y: (parseFloat(position.y.toString()) * pitchHeight) / 100,
  }));
}

export function getFormationVertically(formation: string) {
  const pitchWidth = 350;
  const pitchHeight = 500;

  const originalFormation = getFormation(formation)!;
  return originalFormation.map((position) => ({
    id: position.id,
    y: (parseFloat(position.x.toString()) * pitchHeight) / 100,
    x: (parseFloat(position.y.toString()) * pitchWidth) / 100,
  }));
}

export const formationsKeys = [
  '4-4-2',
  '4-1-4-1',
  '4-2-3-1',
  '4-3-3',
  '3-4-3',
  '3-5-2',
  '3-1-4-2',
  '3-4-1-2',
  '3-4-2-1',
  '3-5-1-1',
  '4-1-2-1-2',
  '4-1-3-2',
  '4-2-4',
  '5-4-1',
  '5-2-3',
  '5-3-2',
];

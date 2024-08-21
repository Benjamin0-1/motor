const minimumAmounts = {
    // Monto min hombres
    m: {
        A: [100, 400, 900, 100, 600], // A partir de los meses: [0-26), 27, 28, 29, [30 - inf]
        B: [1000, 600, 1000, 1000, 1000],
        C: [400, 200, 200, 1000, 600],
        D: [400, 300, 500, 900, 1000]
    },
    // Monto min mujeres
    f: {
        A: [800, 800, 800, 600, 200], // A partir de los meses: [0-24), 25, 26, 27, [28 - inf]
        B: [800, 700, 100, 600, 700],
        C: [200, 900, 700, 800, 100],
        D: [500, 1000, 600, 400, 700]
    }
};

const maximumAmounts = {
    // Monto max hombres
    m: {
        A: [4900, 4700, 4600, 4600, 4500], // A partir de los meses: [0-26), 27, 28, 29, [30 - inf]
        B: [4700, 4400, 5000, 4400, 4900],
        C: [5000, 4700, 5000, 4200, 4600],
        D: [4400, 4700, 4300, 4900, 4300]
    },
    // Monto max mujeres
    f: {
        A: [4000, 4200, 4100, 4200, 4500], // A partir de los meses: [0-24), 25, 26, 27, [28 - inf]
        B: [4700, 4200, 4500, 4300, 4400],
        C: [4600, 4900, 4600, 4700, 4000],
        D: [5000, 4900, 4700, 5000, 4300]
    }
};

function calcMonthsSinceFirstEmployment(firstEmployment) {
    const today = new Date();
    const differenceYears = today.getFullYear() - firstEmployment.getFullYear();
    const differenceMonths = today.getMonth() - firstEmployment.getMonth();

    return differenceYears * 12 + differenceMonths;
}

function creditDecisionEngine(payrollType, firstEmploymentDate, gender) {
    const monthsSinceFirstJob = calcMonthsSinceFirstEmployment(firstEmploymentDate); // Calcula los meses desde el primer empleo.

    let index;

    if (gender === 'm') {

        // he utilizado un switch para mas claridad.
        switch (true) {
            case monthsSinceFirstJob < 26:
                index = 0;
                break;
            case monthsSinceFirstJob === 27:
                index = 1;
                break;
            case monthsSinceFirstJob === 28:
                index = 2;
                break;
            case monthsSinceFirstJob === 29:
                index = 3;
                break;
            default:
                index = 4;
        }
    } else if (gender === 'f') {
        // Condiciones para mujeres
        switch (true) {
            case monthsSinceFirstJob < 24:
                index = 0;
                break;
            case monthsSinceFirstJob === 25:
                index = 1;
                break;
            case monthsSinceFirstJob === 26:
                index = 2;
                break;
            case monthsSinceFirstJob === 27:
                index = 3;
                break;
            default:
                index = 4;
        }
    }

    const minimumCreditAmount = minimumAmounts[gender][payrollType][index]; //Gender: F,M - PayrollType: A,B,C,D - Index: 0,1,2,3,4 <- de esta forma se accede a los valores de los montos mínimos.
    const maximumCreditAmount = maximumAmounts[gender][payrollType][index]; // Y maximos

    const p1 = minimumCreditAmount + Math.sqrt(maximumCreditAmount - minimumCreditAmount);
    const p2 = minimumCreditAmount + 0.0175 * (maximumCreditAmount - minimumCreditAmount);
    const optimalCreditLine = Math.max(p1, p2);

    return {
        montoMinimo: minimumCreditAmount,
        montoMaximo: maximumCreditAmount,
        recomendacionLinea: optimalCreditLine
    };
}


const results = [
    creditDecisionEngine('A', new Date('2022-06-12'), 'f'),
    creditDecisionEngine('B', new Date('1993-12-30'), 'f'),
    creditDecisionEngine('C', new Date('2020-09-19'), 'm'),
    creditDecisionEngine('D', new Date('2019-01-15'), 'm')
];

console.log(results);

/**
 * esto deberia imprimir a la consola: 
 * [
  { montoMinimo: 800, montoMaximo: 4100, recomendacionLinea: 857.75 },
  { montoMinimo: 700, montoMaximo: 4400, recomendacionLinea: 764.75 },
  { montoMinimo: 600, montoMaximo: 4600, recomendacionLinea: 670 },
  { montoMinimo: 1000, montoMaximo: 4300, recomendacionLinea: 1057.75 }
]

 */
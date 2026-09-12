export const BATCH_REPORTS = [
  {
    batchNumber: "SL-2026-NM09",
    productName: "Nutrimix Chocolate Nutrition Powder (350g)",
    ageRange: "2-6 Yr",
    flavour: "Chocolate",
    mfgDate: "12-Aug-2026",
    expDate: "11-Aug-2027",
    testedDate: "15-Aug-2026",
    labName: "Equinox Labs (NABL Accredited Lab TC-5892)",
    certificationNumber: "NABL/EQ/2026/088921",
    overallStatus: "PASSED 100% SAFETY BENCHMARKS",
    summary: "Conforms to FSSAI standards and ICMR guidelines for toddler nutrition. Free from heavy metals, synthetic colors, and maltodextrin.",
    proteinAnalysis: {
      parameter: "Total Protein Content (g/100g)",
      testMethod: "Kjeldahl Method (IS 7219)",
      claimOnPack: "16.0 g",
      actualResult: "18.4 g",
      status: "PASSED (Exceeds Claim)"
    },
    heavyMetals: [
      {
        parameter: "Lead (Pb)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 2.5 ppm",
        testResult: "BDL (<0.02 ppm)",
        status: "SAFE (99% Below Limit)"
      },
      {
        parameter: "Arsenic (As)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 1.1 ppm",
        testResult: "BDL (<0.01 ppm)",
        status: "SAFE (99% Below Limit)"
      },
      {
        parameter: "Cadmium (Cd)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 1.0 ppm",
        testResult: "BDL (<0.01 ppm)",
        status: "SAFE (99% Below Limit)"
      },
      {
        parameter: "Mercury (Hg)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 0.25 ppm",
        testResult: "BDL (<0.005 ppm)",
        status: "SAFE (99% Below Limit)"
      }
    ],
    sugarScreening: {
      addedRefinedSugar: "0.00% (Not Detected)",
      maltodextrin: "0.00% (Not Detected)",
      sweetenerSource: "Raw Organic Jaggery & Sprouted Millet Sugars"
    }
  },
  {
    batchNumber: "SL-2026-NM07",
    productName: "Nutrimix Chocolate Nutrition Powder (7-12 Yr)",
    ageRange: "7-12 Yr",
    flavour: "Chocolate",
    mfgDate: "18-Aug-2026",
    expDate: "17-Aug-2027",
    testedDate: "21-Aug-2026",
    labName: "TUV SUD South Asia (NABL Certified TC-6140)",
    certificationNumber: "TUV/2026/IND/77810",
    overallStatus: "PASSED 100% SAFETY BENCHMARKS",
    summary: "High-protein child formulation. Verified clean label, zero synthetic chemicals.",
    proteinAnalysis: {
      parameter: "Total Protein Content (g/100g)",
      testMethod: "Kjeldahl Method (IS 7219)",
      claimOnPack: "20.0 g",
      actualResult: "21.6 g",
      status: "PASSED (Exceeds Claim)"
    },
    heavyMetals: [
      {
        parameter: "Lead (Pb)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 2.5 ppm",
        testResult: "BDL (<0.02 ppm)",
        status: "SAFE"
      },
      {
        parameter: "Arsenic (As)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 1.1 ppm",
        testResult: "BDL (<0.01 ppm)",
        status: "SAFE"
      },
      {
        parameter: "Cadmium (Cd)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 1.0 ppm",
        testResult: "BDL (<0.01 ppm)",
        status: "SAFE"
      },
      {
        parameter: "Mercury (Hg)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 0.25 ppm",
        testResult: "BDL (<0.005 ppm)",
        status: "SAFE"
      }
    ],
    sugarScreening: {
      addedRefinedSugar: "0.00% (Not Detected)",
      maltodextrin: "0.00% (Not Detected)",
      sweetenerSource: "Sprouted Finger Millet & Cocoa"
    }
  },
  {
    batchNumber: "SL-2026-GM04",
    productName: "Multivitamin Gummies 4+ (30N)",
    ageRange: "4-6 Yr",
    flavour: "Mixed Berry",
    mfgDate: "05-Aug-2026",
    expDate: "04-Aug-2027",
    testedDate: "08-Aug-2026",
    labName: "Eurofins Food Testing India (NABL TC-5421)",
    certificationNumber: "EF/IN/2026/90212",
    overallStatus: "PASSED 100% SAFETY BENCHMARKS",
    summary: "100% Vegetarian Pectin Gummies. Tested for 12 micronutrient levels and microbiological purity.",
    proteinAnalysis: {
      parameter: "Dietary Fiber & Micronutrient Assay",
      testMethod: "HPLC / UV-VIS",
      claimOnPack: "12 Vitamins & Zinc",
      actualResult: "100% Target Met",
      status: "PASSED"
    },
    heavyMetals: [
      {
        parameter: "Lead (Pb)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 2.5 ppm",
        testResult: "BDL (<0.01 ppm)",
        status: "SAFE"
      },
      {
        parameter: "Arsenic (As)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 1.1 ppm",
        testResult: "BDL (<0.01 ppm)",
        status: "SAFE"
      },
      {
        parameter: "Cadmium (Cd)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 1.0 ppm",
        testResult: "BDL (<0.01 ppm)",
        status: "SAFE"
      },
      {
        parameter: "Mercury (Hg)",
        testMethod: "ICP-MS",
        permissibleLimit: "Max 0.25 ppm",
        testResult: "BDL (<0.005 ppm)",
        status: "SAFE"
      }
    ],
    sugarScreening: {
      addedRefinedSugar: "0.00% (Not Detected)",
      maltodextrin: "0.00% (Not Detected)",
      sweetenerSource: "Chicory Root Inulin & Natural Fruit Concentrates"
    }
  }
];

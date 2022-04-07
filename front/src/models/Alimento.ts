export interface QuantidadeNumerica {
    qty: number;
    unit: string;
}

export interface QuantidadeEnergetica {
    kcal: number;
    kj: number;
}

export interface QuantidadeString {
    qty: string;
    unit: string;
}

export interface FattyAcids {
    saturated: QuantidadeNumerica;
    monounsaturated: QuantidadeNumerica;
    polyunsaturated: QuantidadeNumerica;
    _14_0: QuantidadeNumerica;
    _16_0: QuantidadeNumerica;
    _18_0: QuantidadeNumerica;
    _20_0: QuantidadeNumerica;
    _22_0: QuantidadeNumerica;
    _24_0: QuantidadeNumerica;
    _16_1: QuantidadeNumerica;
    _18_1: QuantidadeNumerica;
    _20_1: QuantidadeNumerica;
    _18_2_n_6: QuantidadeNumerica;
    _18_3_n_3: QuantidadeNumerica;
    _20_4: QuantidadeNumerica;
    _18_1t: QuantidadeNumerica;
    _18_2t: QuantidadeNumerica;
}

export interface AminoAcids {
    tryptophan: QuantidadeNumerica;
    threonine: QuantidadeNumerica;
    isoleucine: QuantidadeNumerica;
    leucine: QuantidadeNumerica;
    lysine: QuantidadeNumerica;
    methionine: QuantidadeNumerica;
    cystine: QuantidadeNumerica;
    phenylalanine: QuantidadeNumerica;
    tyrosine: QuantidadeNumerica;
    valine: QuantidadeNumerica;
    arginine: QuantidadeNumerica;
    histidine: QuantidadeNumerica;
    alanine: QuantidadeNumerica;
    aspartic: QuantidadeNumerica;
    glutamic: QuantidadeNumerica;
    glycine: QuantidadeNumerica;
    proline: QuantidadeNumerica;
    serine: QuantidadeNumerica;
}

export interface Atributos {
    humidity: QuantidadeNumerica;
    protein: QuantidadeNumerica;
    lipid: QuantidadeNumerica;
    cholesterol: QuantidadeNumerica;
    carbohydrate: QuantidadeNumerica;
    fiber: QuantidadeNumerica;
    ashes: QuantidadeNumerica;
    calcium: QuantidadeNumerica;
    magnesium: QuantidadeNumerica;
    phosphorus: QuantidadeNumerica;
    iron: QuantidadeNumerica;
    sodium: QuantidadeNumerica;
    potassium: QuantidadeNumerica;
    copper: QuantidadeNumerica;
    zinc: QuantidadeNumerica;
    retinol: QuantidadeString;
    thiamine: QuantidadeNumerica;
    riboflavin: QuantidadeNumerica;
    pyridoxine: QuantidadeString;
    niacin: QuantidadeNumerica;
    energy: QuantidadeEnergetica;
    fatty_acids: FattyAcids;
    amino_acids: AminoAcids;
    manganese: QuantidadeNumerica;
}

export interface Alimento {
    id: number;
    description: string;
    base_qty: number;
    base_unit: string;
    category_id: number;
    attributes: Atributos;
}


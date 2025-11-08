export interface LanguageFields {
  amharic: string;
  oromiffa: string;
}

export interface ParsedDataDto {
  dataOfIssue: LanguageFields;
  fullName: LanguageFields;
  dateOfBirth: LanguageFields;
  sex: LanguageFields;
  expireDate: LanguageFields;
  FAN: string;
  phoneNumber: string;
  region: LanguageFields;
  city: LanguageFields;
  kebele: LanguageFields;
  whereRegistered: LanguageFields;
  FIN: string;
  personelImage: string;
  barcodeImage: string;
  [key: string]: any;
}

export interface ParseResponse {
  success: boolean;
  data?: ParsedDataDto;
  error?: string;
  missingFields?: string[];
}

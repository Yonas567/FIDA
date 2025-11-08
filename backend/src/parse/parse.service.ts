import { Injectable } from "@nestjs/common";
import { ParsedDataDto, ParseResponse } from "./dto/parsed-data.dto";

@Injectable()
export class ParseService {
  private readonly REQUIRED_FIELDS = [
    "dataOfIssue",
    "fullName",
    "dateOfBirth",
    "sex",
    "expireDate",
    "FAN",
    "phoneNumber",
    "region",
    "city",
    "kebele",
    "whereRegistered",
    "FIN",
    "personelImage",
    "barcodeImage",
  ];

  private validateParsedData(data: any): ParseResponse {
    const missingFields: string[] = [];

    for (const field of this.REQUIRED_FIELDS) {
      const value = data[field];

      if (value === undefined || value === null) {
        missingFields.push(field);
        continue;
      }

      if (
        field === "dataOfIssue" ||
        field === "fullName" ||
        field === "dateOfBirth" ||
        field === "sex" ||
        field === "expireDate" ||
        field === "region" ||
        field === "city" ||
        field === "kebele" ||
        field === "whereRegistered"
      ) {
        if (
          typeof value !== "object" ||
          !value.hasOwnProperty("amharic") ||
          !value.hasOwnProperty("oromiffa")
        ) {
          missingFields.push(field);
        }
      } else {
        if (typeof value !== "string") {
          missingFields.push(field);
        }
      }
    }

    if (missingFields.length > 0) {
      return {
        success: false,
        error: "Missing required fields",
        missingFields,
      };
    }

    return {
      success: true,
      data: data as ParsedDataDto,
    };
  }

  private getContentType(mimeType?: string): string {
    if (!mimeType) {
      return "application/pdf";
    }

    const imageTypes: Record<string, string> = {
      "image/jpeg": "image/jpeg",
      "image/jpg": "image/jpeg",
      "image/png": "image/png",
      "image/gif": "image/gif",
      "image/webp": "image/webp",
    };

    return imageTypes[mimeType.toLowerCase()] || mimeType;
  }

  async parseDocument(
    fileBuffer: Buffer,
    mimeType?: string
  ): Promise<ParseResponse> {
    const apiUrl = process.env.EXTERNAL_API_URL;
    const apiKey = process.env.EXTERNAL_API_KEY;
    const contentType = this.getContentType(mimeType);

    if (apiUrl) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: fileBuffer as any,
          headers: {
            "Content-Type": contentType,
            ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
          },
        });

        if (!response.ok) {
          return {
            success: false,
            error: `API returned status ${response.status}: ${response.statusText}`,
          };
        }

        const data = await response.json();
        const result = this.validateParsedData(data);
        return result;
      } catch (error: any) {
        return {
          success: false,
          error: error.message || "Failed to parse document",
        };
      }
    }

    return {
      success: false,
      error:
        "External API not configured. Please set EXTERNAL_API_URL in environment variables.",
      missingFields: [],
    };
  }
}

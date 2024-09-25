import { google } from "googleapis";
import { IGoogleSheetsData, RangeVar } from "./convertOrders";

export interface IKeyMass {
  append: RangeVar
  change: IGoogleSheetsData['row'][];
}

export async function setGoogleSheetData(keyMass: IKeyMass) {
  try {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
    
    const jwt = new google.auth.JWT(
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      scopes
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });

    //NEXT_PUBLIC_SPREADSHEET_ID - from google sheet url in which data will be appended/updated
    			
    const append = await sheets.spreadsheets.values.update({     
      auth: jwt,
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: keyMass.change,
      },
      range: `${keyMass.append}!A2:J${keyMass.change.length + 1}`,
    });

    return append.status;

  } catch (err) {
    console.log(err);
  }

  return [];
}
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export type CompanyDetailsResult = {
  code: string;
  message: string;
  result: CompanyDetails;
};

export interface CompanyDetails {
  KeyNo: string;
  Name: string;
  No: string;
  BelongOrg: string;
  OperId: string;
  OperName: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  Province: string;
  UpdatedDate: string;
  CreditCode: string;
  RegistCapi: string;
  EconKind: string;
  Address: string;
  Scope: string;
  TermStart: string;
  TermEnd: string;
  CheckDate: string;
  OrgNo: string;
  IsOnStock: string;
  StockNumber: string;
  StockType: string;
  OriginalName: any[];
  ImageUrl: string;
  EntType: string;
  RecCap: string;
  RevokeInfo?: any;
  Area: Area;
  AreaCode: string;
  TeamEnd: string;
}

interface Area {
  Province: string;
  City: string;
  County: string;
}

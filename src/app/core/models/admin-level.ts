export interface AdminLevel {
    AdminLevelId: number;
    AdminLevelName: string;
    RestrictIPList?: string;
    Description: string;
    Remark: string;
    IsAdministrator?: boolean;
    CreateDate?: Date;
    ModifiedDate?: Date;
}

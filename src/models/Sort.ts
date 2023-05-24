export enum SortField {
    FirstName,
    LastName,
    Status,
    Position
}

export enum SortOrder {
    Ascending,
    Descending
}
export interface Sort {
    field: SortField;
    order: SortOrder;
}
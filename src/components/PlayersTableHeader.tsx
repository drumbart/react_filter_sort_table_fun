import {StyledHeader} from "../common/Styles";
import {Sort, SortField, SortOrder} from "../models/Sort";

interface PlayersTableHeaderProps {
    sortField: SortField;
    sortOrder: SortOrder;
    setSort: (sort: Sort) => void;
}

export function PlayersTableHeader({sortField, sortOrder, setSort}: PlayersTableHeaderProps) {
    const sortArrow = (field: SortField, sortOrder: SortOrder) => {
        return field === sortField ?
            sortOrder === SortOrder.Ascending ?
                <span>&#8595;</span> :
                <span>&#8593;</span>
            : null;
    }

    const changeSortHandler = (field: SortField, order: SortOrder) => {
        if (field === sortField) {
            setSort({
                field: sortField,
                order: order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending
            });
        } else {
            setSort({
                field: field,
                order: SortOrder.Ascending
            });
        }
    }

    return (
        <tr key='HeaderRow'>
            <StyledHeader onClick={() => changeSortHandler(SortField.FirstName, sortOrder)}>
                First name {sortArrow(SortField.FirstName, sortOrder)}
            </StyledHeader>
            <StyledHeader onClick={() => changeSortHandler(SortField.LastName, sortOrder)}>
                Last name {sortArrow(SortField.LastName, sortOrder)}
            </StyledHeader>
            <StyledHeader onClick={() => changeSortHandler(SortField.Position, sortOrder)}>
                Position {sortArrow(SortField.Position, sortOrder)}
            </StyledHeader>
            <StyledHeader onClick={() => changeSortHandler(SortField.Status, sortOrder)}>
                Status {sortArrow(SortField.Status, sortOrder)}
            </StyledHeader>
        </tr>
    );
}
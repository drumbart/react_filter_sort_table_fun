import {useEffect, useState} from "react";
import {Player} from "../models/Player";
import {StyledDataCell, StyledTable} from "../common/Styles";
import {SearchBar} from "../components/SearchBar";
import {Sort, SortField, SortOrder} from "../models/Sort";
import {PlayersTableHeader} from "../components/PlayersTableHeader";

export function PlayersPage() {
    const [
        players,
        setPlayers
    ] = useState<Player[]>();
    const [
        searchText,
        setSearchText
    ] = useState<string>('');
    const [
        sort,
        setSort
    ] = useState<Sort>({field: SortField.LastName, order: SortOrder.Ascending});


    const getPlayers = async () => {
        const result = await fetch('https://api.sleeper.app/v1/players/nfl');
        const jsonResult = await result.json();
        setPlayers(jsonResult);
        console.log('fetched players...');
    }


    useEffect(() => {
        getPlayers().catch();
    }, []);


    const filterPlayers = (players: Player[]) => {
        return searchText.length ? players.filter((player) => {
            return player.first_name.toLowerCase().includes(searchText) ||
                player.last_name.toLowerCase().includes(searchText) ||
                player.status?.toLowerCase().includes(searchText) ||
                player.position?.toLowerCase().includes(searchText);
        }) : players;
    }


    const sortPlayers = (a: Player, b: Player) => {
        const order = sort.order === SortOrder.Ascending ? 1 : -1;
        switch (sort.field) {
            case SortField.FirstName:
                return a.first_name.localeCompare(b.first_name) * order;
            case SortField.LastName:
                return a.last_name.localeCompare(b.last_name) * order;
            case SortField.Status:
                return a.status && b.status ? (a.status.localeCompare(b.status) * order) : order;
            case SortField.Position:
                return a.position && b.position ? (a.position.localeCompare(b.position) * order) : order;
            default:
                return order;
        }
    }


    return (
        <>
            <SearchBar setSearchText={setSearchText}/>
            <StyledTable>
                <tbody>
                <PlayersTableHeader sortField={sort.field} sortOrder={sort.order} setSort={setSort}/>
                {
                    players && filterPlayers(Object.values(players)).sort(sortPlayers).map((player: Player) =>
                        <tr key={player.player_id}>
                            <StyledDataCell>{player.first_name}</StyledDataCell>
                            <StyledDataCell>{player.last_name}</StyledDataCell>
                            <StyledDataCell>{player.position ?? 'N/A'}</StyledDataCell>
                            <StyledDataCell>{player.status ?? 'N/A'}</StyledDataCell>
                        </tr>)
                }
                </tbody>
            </StyledTable>
        </>
    );
}
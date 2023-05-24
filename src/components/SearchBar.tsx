import React from "react";
import {StyledInput} from "../common/Styles";

interface SearchBarProps {
    setSearchText: (text: string) => void;
}

export function SearchBar({setSearchText}: SearchBarProps) {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    return (
        <div className="App-header">
            <StyledInput id="SearchBar" type={"text"} placeholder={"Search players..."} onChange={changeHandler}/>
        </div>
    );
}
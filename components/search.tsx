import {Box, ButtonGroup, IconButton, TextField} from "@mui/material";
import * as React from "react";
import {HighlightOff, SearchOutlined} from "@mui/icons-material";

interface SearchProps {
    productId: number | null
    onSearch: (id: number|null) => void
}

export const Search: React.FC<SearchProps> = ({ productId, onSearch }) => {

    const search: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log('submit');
        const searchInput = event.currentTarget.querySelector('#productId')  as HTMLInputElement;
        if(searchInput) {
            if(searchInput.value) {
                onSearch(parseInt(searchInput.value));
            } else {
                onSearch(null);
            }
        }
    }
    const reset = () => {
        onSearch(null);
    }

    return (
        <Box
            component={"form"}
            sx={{ width: '100%', my: '40px' }}
            noValidate
            autoComplete="off"
            onSubmit={search}
            onReset={reset}
        >
            <TextField
                fullWidth
                name={"productId"}
                id={"productId"}
                label={"Search by product ID (click enter)"}
                type={"number"}
                defaultValue={productId ?? ''}
                InputProps={{
                    endAdornment: (
                        <ButtonGroup>
                            { productId &&
                                <IconButton type={"reset"} color={"error"} aria-label={"Reset search"}>
                                    <HighlightOff />
                                </IconButton>
                            }
                            <IconButton type={"submit"} color={"primary"} aria-label={"Search"}>
                                <SearchOutlined />
                            </IconButton>
                        </ButtonGroup>
                    ),
                }}
            />
        </Box>
    )
}

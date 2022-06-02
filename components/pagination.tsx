import {Box, ButtonGroup, IconButton, Typography, Grid} from "@mui/material";
import * as React from "react";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({page, totalPages, onPageChange}) => {

    const changePage = (up: boolean) => {
        if(up) {
            onPageChange(page + 1);
        } else {
            if(page > totalPages) {
                onPageChange(totalPages);
            } else {
                onPageChange(page - 1);
            }
        }
    }

    return (
        <Grid container spacing={1} my={"20px"} className={"pagination"}>
            <Grid item xs={12} alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
                <IconButton onClick={() => changePage(false)} disabled={page <= 1} className={"paginationPrev"}>
                    <ArrowBackIos/>
                </IconButton>
                <IconButton onClick={() => changePage(true)} disabled={page >= totalPages} className={"paginationNext"}>
                    <ArrowForwardIos/>
                </IconButton>
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
                <Typography className={"paginationSummary"}>Page {page} out of {totalPages}</Typography>
            </Grid>
        </Grid>
)
}

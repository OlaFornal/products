import {Typography, Grid} from "@mui/material";
import * as React from "react";

interface HeadlineProps {
    page: number
    productId: number | null
}

export const Headline: React.FC<HeadlineProps> = ({page, productId}) => {
    return (
        <Grid container spacing={1} my={"20px"} className={"headline"}>
            <Grid item xs={12} textAlign={"center"}>
                {productId ?
                    <Typography variant="h4">Search results for id: { productId }</Typography> :
                    <Typography variant="h4">Product list</Typography>
                }
            </Grid>
        </Grid>
    )
}

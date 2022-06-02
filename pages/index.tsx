import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from "react";
import {getProductById, getProductsByPage} from "../api/productApi";
import {Product} from "../types";
import {ProductList} from "../components/product_list";
import {Search} from "../components/search";
import {Container} from "@mui/material";
import {useRouter} from "next/router";
import {Pagination} from "../components/pagination";
import {Headline} from "../components/headline";

interface ProductsState {
    products: Product[]
    isLoading: boolean
    error?: string
    page: number
    totalPages: number
}

interface HomeProps {
    initialPage: number
    initialProductId: number | null
}

const Home: NextPage<HomeProps> = ({initialPage, initialProductId}) => {
    const router = useRouter();
    const [productsState, setProductsState] = useState<ProductsState>({
        page: initialPage,
        totalPages: 1,
        isLoading: true,
        products: []
    });
    const [productId, setProductID] = useState<number | null>(initialProductId);

    useEffect(() => {
        updateProductsList()
    }, [productsState.page, productId]);

    const changePage = (page: number) => {
        setProductsState({...productsState, ...{page: page, isLoading: true}})
    }

    const updateProductsList = async () => {
        let productData = {}
        if (productId) {
            const productsResponse = await getProductById(productId);
            productData = {
                products: productsResponse.data ? [productsResponse.data] : [],
                isLoading: false,
                page: 1,
                error: productsResponse.error
            }
            await router.push(`/?product=${productId}`, undefined, {shallow: true})
        } else {
            const productsResponse = await getProductsByPage(productsState.page);
            productData = {
                products: productsResponse.data,
                isLoading: false,
                page: productsResponse.page,
                totalPages: productsResponse.total_pages,
                error: productsResponse.error
            }
            const path = productsResponse.page === 1 ? '/' : `/?page=${productsResponse.page}`;
            await router.push(path, undefined, {shallow: true})
        }
        setProductsState({...productsState, ...productData})
    }


    return (
        <div>
            <Head>
                <title>Products</title>
                <meta name="description" content="Internship task"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <Container maxWidth="md">
                <Headline page={productsState.page} productId={productId} />
                <Search productId={productId} onSearch={(id: number | null) => {setProductID(id);}}/>
                <ProductList products={productsState.products} isLoading={productsState.isLoading} error={productsState.error}/>
                {!productId && <Pagination page={productsState.page} totalPages={productsState.totalPages} onPageChange={changePage}/>}
            </Container>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let page = context.query.page && typeof context.query.page === "string" ? parseInt(context.query.page) : 1;
    const productId = context.query.product && typeof context.query.product === "string" ? parseInt(context.query.product) : null;

    if(isNaN(page)) {
        page = 1;
    } else if (page < 1) {
        page = 1;
    }

    return {
        props: {
            initialPage: isNaN(page) ? 1 : page,
            initialProductId: productId !== null && isNaN(productId) ? null : productId
        }
    }
}

export default Home

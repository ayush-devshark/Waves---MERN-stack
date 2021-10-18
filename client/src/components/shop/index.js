import React, { useEffect, useState, useReducer } from 'react';
import CardBlocks from 'utils/products/cardblocks';
import PaginateNav from 'utils/paginateNav';
import SearchBar from './searchBar';
import CollapseCheckbox from './CollapseCheckbox';

import { useDispatch, useSelector } from 'react-redux';
import { productsByPaginate } from 'store/actions/products.actions';
import { getAllBrands } from 'store/actions/brands.actions';

import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';

const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 100000,
    frets: [],
    page: 1,
};

const Shop = () => {
    const [grid, setGrid] = useState(false);
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    );

    const brands = useSelector(state => state.brands);
    const { byPaginate } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productsByPaginate(searchValues));
    }, [searchValues, dispatch]);

    const handleGrid = () => setGrid(!grid);

    const goToPage = page => {
        setSearchValues({ page });
    };

    const handleResetSearch = () => {
        setSearchValues({ keywords: '', page: 1 });
    };

    const handleKeywords = value => {
        console.log({ value });
        setSearchValues({ keywords: value });
    };

    const handleFilters = (filters, category) => {
        if (category === 'brands') {
            setSearchValues({ brand: filters, page: 1 });
        }
    };

    return (
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>
                    <SearchBar
                        handleKeywords={values => handleKeywords(values)}
                    />
                </div>
            </div>
            <div className='container'>
                <div className='show_wrapper'>
                    <div className='left'>
                        <CollapseCheckbox
                            initialState={true}
                            title='Brands'
                            list={brands.all}
                            handleFilters={filters =>
                                handleFilters(filters, 'brands')
                            }
                        />
                    </div>
                    <div className='right'>
                        <div className='shop_options'>
                            <div className='shop_grids clear'>
                                <div
                                    className={`grid_btn ${
                                        grid ? '' : 'active'
                                    }`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOnIcon />
                                </div>
                                <div
                                    className={`grid_btn ${
                                        grid ? '' : 'active'
                                    }`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOffIcon />
                                </div>
                            </div>
                        </div>
                        <div>
                            {byPaginate && byPaginate.docs ? (
                                <>
                                    <CardBlocks
                                        grid={grid}
                                        items={byPaginate.docs}
                                        shop={true}
                                    />
                                    <PaginateNav
                                        prods={byPaginate}
                                        prev={page => goToPage(page)}
                                        next={page => goToPage(page)}
                                        resetSearch={() => handleResetSearch()}
                                    />
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;

import { FETCH_PRODUCTS, FETCH_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_LOADING, SET_CATEGORIES, SET_FILTERED_PRODUCTS, SET_VISIBLE_COUNT} from './actions';

const initialState = {
    products: [],
    currentProduct: null,
    filteredProducts: [],
    categories: [],
    loading: false,
    visibleCount: 15
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, products: action.payload, filteredProducts: action.payload };
        
        case FETCH_PRODUCT:
            return { ...state, currentProduct: action.payload };

        case CREATE_PRODUCT:
            return { ...state, products: [...state.products, action.payload] };

        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
                filteredProducts: state.filteredProducts.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
                currentProduct: action.payload,
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
                filteredProducts: state.filteredProducts.filter(product => product.id !== action.payload),
            };

        case SET_LOADING:
            return { ...state, loading: action.payload };

        case SET_CATEGORIES:
            return { ...state, categories: action.payload };

        case SET_FILTERED_PRODUCTS:
            return { ...state, filteredProducts: action.payload };

        case SET_VISIBLE_COUNT:
            return { ...state, visibleCount: action.payload };

        default:
            return state;
    }
};

export default productReducer;

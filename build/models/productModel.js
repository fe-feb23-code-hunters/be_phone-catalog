"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const dummyProducts = [
    {
        id: 1,
        name: 'iPhone',
        model: 'XS',
        color: 'Silver',
    },
    {
        id: 2,
        name: 'iPad',
        model: 'Air',
        color: 'Space Gray',
    },
    {
        id: 3,
        name: 'iPhone',
        model: 'XS',
        color: 'Silver',
    },
];
function getAll({ offset, limit }) {
    const paginatedProducts = dummyProducts.slice(offset, offset + limit);
    const totalCount = dummyProducts.length;
    return {
        rows: paginatedProducts,
        count: totalCount,
    };
}
exports.getAll = getAll;

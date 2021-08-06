import React from "react";

export function FavoriteBuilder() {
    const key = 'likedCountries';

    return Object.freeze({
        includes,
        add,
        remove,
        toggle,
    });

    function add(id) {
        store([...load().filter(x => x !== id), id]);
    }

    function remove(id) {
        store(load().filter(x => x !== id));
    }

    function includes(id) {
        return load().findIndex(x => x === id) !== -1;
    }

    function toggle(id) {
        if (includes(id)) {
            remove(id);
            return false;
        }
        else {
            add(id);
            return true;
        }
    }


    function load() {
        return JSON.parse(localStorage.getItem(key)) ?? [];
    }

    function store(data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export const favorite = FavoriteBuilder();

export const FavoriteContext = React.createContext(null);
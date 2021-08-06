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
        store([...load(), id]);
    }

    function remove(id) {
        store(load().filter(x => x != id));
    }

    function includes(id) {
        return load().includes(id);
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

export const FavoriteContext = React.createContext({});
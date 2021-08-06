
import { useState } from 'react';
import { favorite } from '../util/favorite';


export default function LikableButton({ id }) {
    const [liked, setLiked] = useState(favorite.includes(id));

    return (
        <button onClick={() => setLiked(favorite.toggle(id))}>
            {liked ? 'liked' : 'not liked'}
        </button>
    )
}
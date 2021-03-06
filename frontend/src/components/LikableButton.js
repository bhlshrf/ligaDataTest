
import { useState } from 'react';
import { favorite } from '../util/favorite';


export default function LikableButton({ id }) {
    const [liked, setLiked] = useState(!!favorite.includes(id));

    return (
        <button className={liked ? 'btn liked' : 'btn'} onClick={() => setLiked(favorite.toggle(id))}>
            {liked ? 'Liked' : 'Click to Like'}
        </button>
    )
}
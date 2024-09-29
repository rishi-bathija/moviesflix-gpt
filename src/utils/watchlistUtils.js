import toast from "react-hot-toast";
import { addToWatchlist, removeFromWatchlist } from "./movieSlice";


export const handleAddToWatchlist = async (auth, movie, selectedCategory, dispatch) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken();
            const response = await fetch('https://moviesflix-gpt-backend.vercel.app/api/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ data: { ...movie, selectedCategory } })
            });

            if (response.ok) {
                console.log('Movie added to watchlist');
                toast.success("Added to watchlist");
                dispatch(addToWatchlist(movie));
            } else {
                toast.error("Failed to add to watchlist");
                console.log('Failed to add movie to watchlist');
            }
        } else {
            toast.error("User not authenticated");
            console.error('User not authenticated');
        }
    } catch (error) {
        toast.error("Something went wrong");
        console.error('Error adding movie to watchlist:', error);
    }
};


export const handleRemoveFromWatchlist = async (auth, movie, dispatch) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken();
            const response = await fetch('https://moviesflix-gpt-backend.vercel.app/api/user/remove', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ movieId: movie.id })
            });

            if (response.ok) {
                // Remove the deleted movie from the watchlist state
                dispatch(removeFromWatchlist(movie.id));
                toast.success("Removed from watchlist");
                console.log('Deleted movie:', movie.id);
            } else {
                toast.error("Failed to delete from watchlist");
                console.error('Failed to delete movie, status:', response.status);
            }
        } else {
            toast.error("User not authenticated");
            console.error('User not authenticated');
        }
    } catch (error) {
        toast.error("Something went wrong");
        console.error('Error deleting movie:', error);
    }
};
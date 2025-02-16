
// image slider
// export const images = [
//     bannerOne, bannerTwo, bannerThree, bannerTwo
// ];
// export const imagesMobile = [
//     bannerOnem, bannerTwom, bannerThreem, bannerOnem
// ];


//toasts
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export const showToast = (type, message) => {
    const commonConfig = {
        duration: 3000,
        position: 'top-center',
        ariaProps: { role: 'status', 'aria-live': 'polite' },
    };

    if (type === 'success') {
        toast(
            <div className="flex center g5">
                <VerifiedIcon />
                {message}
            </div>,
            {
                ...commonConfig,
                style: { color: 'rgb(0, 189, 0)' },
                className: 'success',
            }
        );
    } else if (type === 'error') {
        toast(
            <div className="flex center g5">
                <NewReleasesIcon />
                {message}
            </div>,
            {
                ...commonConfig,
                style: { color: 'red' },
                className: 'failed',
            }
        );
    }
};

//format date and time
export const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date)) return null;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day} ${month} ${year}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

//admin panel
import orderList from './images/icons8-orders-list-100.png';
import reviewsList from './images/reviews.png';
import userList from './images/icons8-users-list-100.png';
import productList from './images/icons8-product-list-100.png';
import addproduct from './images/icons8-add-new-product-100.png';
import categoryList from './images/icons8-category-list-100.png';
import adminList from './images/icons8-role-management-100.png';
import featured from './images/featured.png';
import newAdmin from './images/newAdmin.png';

export const accordionData = [
    {
        header: 'Users',
        bricks: [
            { name: 'Order List', route: '/dashboard/order-list', icon: orderList },
            { name: 'Reviews List', route: '/dashboard/reviews-list', icon: reviewsList },
            { name: 'User List', route: '/dashboard/user-list', icon: userList }
        ]
    },
    {
        header: 'Products',
        bricks: [
            { name: 'Add New Product', route: '/dashboard/add-new-product', icon: addproduct },
            { name: 'Products List', route: '/dashboard/product-list', icon: productList },
            { name: 'Featured Products', route: '/dashboard/featured-products', icon: featured },
            { name: 'Categories List', route: '/dashboard/category-list', icon: categoryList }
        ]
    },
    {
        header: 'Management',
        bricks: [
            { name: 'Add Manager', route: '/dashboard/add-manager', icon: newAdmin },
            { name: 'Admin List', route: '/dashboard/admin-list', icon: adminList }
        ]
    },
];

const bla = [
    {
        "tags": ["DC", "Superhero", "Batman"],
        "title": "The Dark Knight Bat Logo Tee",
        "category": "Superhero",
        "originalPrice": "₹1199",
        "salePrice": "₹899",
        "stocks": "30",
        "information": "A sleek black Batman T-shirt with the classic Bat-symbol from The Dark Knight trilogy."
    },
    {
        "tags": ["Anime", "Dragon Ball Z", "Goku"],
        "title": "Dragon Ball Z Goku Kanji Tee",
        "category": "Anime",
        "originalPrice": "₹1399",
        "salePrice": "₹1099",
        "stocks": "40",
        "information": "An orange T-shirt with Goku’s training symbol printed on the front and back."
    },
    {
        "tags": ["Movie", "Star Wars", "Sci-Fi"],
        "title": "Star Wars Darth Vader 'Dark Side' Tee",
        "category": "Movie",
        "originalPrice": "₹1499",
        "salePrice": "₹1199",
        "stocks": "35",
        "information": "A black Star Wars tee featuring Darth Vader with ‘Join the Dark Side’ text."
    },
    {
        "tags": ["Marvel", "Deadpool", "Anti-Hero"],
        "title": "Deadpool Maximum Effort T-Shirt",
        "category": "Superhero",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "40",
        "information": "A fun Deadpool tee featuring his catchphrase ‘Maximum Effort’."
    },
    {
        "tags": ["Anime", "Naruto", "Shonen"],
        "title": "Naruto Akatsuki Cloud Tee",
        "category": "Anime",
        "originalPrice": "₹1399",
        "salePrice": "₹1099",
        "stocks": "50",
        "information": "A black tee featuring the iconic red Akatsuki clouds from Naruto."
    },
    {
        "tags": ["TV Series", "Breaking Bad", "Walter White"],
        "title": "Breaking Bad Heisenberg Tee",
        "category": "TV Series",
        "originalPrice": "₹1199",
        "salePrice": "₹899",
        "stocks": "45",
        "information": "A minimalist design featuring Walter White’s Heisenberg sketch."
    },
    {
        "tags": ["Movie", "Harry Potter", "Hogwarts"],
        "title": "Harry Potter Hogwarts Crest Tee",
        "category": "Movie",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "35",
        "information": "A Hogwarts-themed T-shirt featuring the house crest."
    },
    {
        "tags": ["TV Series", "Game of Thrones", "Fantasy"],
        "title": "Game of Thrones House Stark Tee",
        "category": "TV Series",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "40",
        "information": "A Winterfell-inspired tee with the Stark direwolf sigil."
    },
    {
        "tags": ["Marvel", "Loki", "Villain"],
        "title": "Loki TVA Variant Tee",
        "category": "Superhero",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "30",
        "information": "A TVA-themed Loki T-shirt with the 'Variant' print."
    }
];

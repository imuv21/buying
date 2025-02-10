import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategory, clearErrors } from '../../slices/productSlice';
import { showToast } from '../../assets/Schemas';
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader';

import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const CategoryList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, catLoading, catError, totalCategories, totalCategoryPages, pageCategories, isFirstCategory, isLastCategory, hasNextCategory,
        hasPreviousCategory, addCatLoading, addCatError, delCatLoading } = useSelector((state) => state.product);

    const MAX_IMAGES = 1;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const [reviewImages, setReviewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isClickedFooterTwo, setIsClickedFooterTwo] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputRef = useRef(null);
    const initialState = {
        categoryName: ''
    };
    const [formData, setFormData] = useState(initialState);

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [catId, setCatId] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("desc");

    useEffect(() => {
        dispatch(getCategory({ page, size, sortBy, order }));
    }, [dispatch, page, size, sortBy, order]);

    useEffect(() => {
        if (reviewImages.length === 0) {
            setPreviewImages([]);
        }
    }, [reviewImages]);


    const handleClickFooter = (catId) => {
        setCatId(catId);
        setIsClickedFooter(true);
    };
    const handleClickFooterTwo = () => {
        setIsClickedFooterTwo(true);
    };
    const closepopup = () => {
        setIsClickedFooter(false);
        setIsClickedFooterTwo(false);
        setCatId(null);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) {
                showToast('error', 'Invalid file type. Only images are allowed!');
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                showToast('error', 'File size exceeds 10 MB!');
                return false;
            }
            return true;
        });

        const uniqueFiles = validFiles.filter(
            (file) => !reviewImages.some((img) => img.name === file.name)
        );
        const totalImagesAllowed = Math.max(MAX_IMAGES - reviewImages.length, 0);
        const filesToAdd = uniqueFiles.slice(0, totalImagesAllowed);
        const previews = filesToAdd.map((file) => URL.createObjectURL(file));

        setReviewImages((prev) => [...prev, ...filesToAdd]);
        setPreviewImages((prev) => [...prev, ...previews]);

        if (validFiles.length > filesToAdd.length) {
            showToast('error', `You can upload only ${MAX_IMAGES} image!`);
        }
    };
    const handleDeleteImage = (index) => {
        setPreviewImages((prev) => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index]);
            newPreviews.splice(index, 1);
            return newPreviews;
        });
        setReviewImages((prev) => prev.filter((_, i) => i !== index));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        dispatch(clearErrors());
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const catData = new FormData();
            catData.append("categoryName", DOMPurify.sanitize(formData.categoryName));
            reviewImages.forEach((file) => {
                catData.append("categoryImage", file);
            });
            const response = await dispatch(addCategory(catData)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                previewImages.forEach((url) => URL.revokeObjectURL(url));
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setFormData(initialState);
                setReviewImages([]);
                setPreviewImages([]);
                closepopup();
                dispatch(getCategory({ page, size, sortBy, order }));
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitted(false);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (isDeleted) return;
        setIsDeleted(true);
        try {
            const response = await dispatch(deleteCategory(catId)).unwrap();
            if (response.status === "success") {
                showToast('success', `${response.message}`);
                closepopup();
                dispatch(getCategory({ page, size, sortBy, order }));
            } else {
                showToast('error', `${response.message}`);
            }
        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsDeleted(false);
        }
    };


    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalCategoryPages) {
            setPage(newPage);
        }
    };
    const getPageNumbers = (currentPage, totalCategoryPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalCategoryPages, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalCategoryPages, startPage + maxPageButtons - 1);
            } else if (endPage === totalCategoryPages) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalCategoryPages);

    const toggleOrder = () => {
        setOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const goCategory= (categoryName) => {
        navigate(`/dashboard/admin-category?query=${categoryName}`);
    }

    if (catLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <div className="sortCat">
                <div className="flexcol">
                    <h1 className="heading">Category List</h1>
                    <p className="text">Showing {pageCategories || 0} of {totalCategories || 0} categories</p>
                </div>

                <div className="flex center g10">
                    <button onClick={() => handleClickFooterTwo()}>Add Category</button>
                    <select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="categoryName">Name</option>
                    </select>

                    <div className="orderfilter" onClick={toggleOrder}>
                        {order === "asc" ? <NorthIcon /> : <SouthIcon />}
                    </div>
                </div>
            </div>

            <div className='usersList'>
                {catError ? (<p className="text">Error loading categories!</p>) : (
                    <Fragment>
                        <div className="userRow">
                            <div className="index fw-800">Index</div>
                            <div className="index catImage fw-800">Image</div>
                            <div className="email fw-800">Title</div>
                            <div className="seeBtns fw-800">Action</div>
                        </div>

                        {categories && categories.length > 0 ? categories.map((cat, index) => (
                            <div className="userRow" key={cat._id}>
                                <div className="index">{index + 1}</div>
                                <div className="index catImage">
                                   <img src={cat.categoryImage} alt={cat.categoryName} /> 
                                </div>
                                <div className="email">{cat.categoryName}</div>
                                <div className="seeBtns">
                                    <button className='remove-btn' onClick={() => handleClickFooter(cat._id)}>Delete</button>
                                    <button onClick={() => goCategory(cat.categoryName)}>View</button>
                                </div>
                            </div>)) : (<p className='text'>No categories found!</p>)
                        }
                    </Fragment>
                )}
            </div>

            <div className="flex center w100">
                {!catLoading && !catError && totalCategories > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(1)} disabled={isFirstCategory}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPreviousCategory}>
                                Previous
                            </button>
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            {pageNumbers.map(index => (
                                <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} onClick={() => handlePageChange(index)}>
                                    {index}
                                </button>
                            ))}
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNextCategory}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalCategoryPages)} disabled={isLastCategory}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" onSubmit={handleDelete}>
                            <h2 className="headingSmol">Are you sure?</h2>

                            <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                <button type='submit' disabled={isDeleted || delCatLoading}>{(isDeleted || delCatLoading) ? 'Deleting...' : 'Yes'}</button>
                                <button type="button" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className={`popup-btn ${isClickedFooterTwo ? 'clicked' : ''}`}>
                {isClickedFooterTwo && (
                    <div className="popup">
                        <form className="popup-wrapper" onSubmit={handleSubmit}>
                            <h2 className="headingSmol">Add New Category</h2>

                            <div className="popInputCont">
                                <div className="flexcol start-center w100 g5">
                                    <input type="text" name="categoryName" placeholder="Enter category name..." value={formData.categoryName} onChange={handleChange} />
                                </div>

                                <div className="flexcol center w100 g5">
                                    <label htmlFor="file-upload" className="upload-label">
                                        <UploadIcon />
                                        <span className='text'>Upload Images</span>
                                    </label>
                                    <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} ref={fileInputRef} />
                                    {previewImages && previewImages.length > 0 &&
                                        <div className="preview-container">
                                            {previewImages.map((image, index) => (
                                                <div className="preview-box" key={image}>
                                                    <img src={image} alt={`Preview ${index}`} className="preview-image" />
                                                    <span className="delete-icon"><DeleteForeverIcon onClick={() => handleDeleteImage(index)} /></span>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                                {addCatError && <p className="error">{addCatError}</p>}
                            </div>

                            <div className="flex w100 g10" style={{ justifyContent: 'space-between' }}>
                                <button type='submit' disabled={isSubmitted || addCatLoading}>{(isSubmitted || addCatLoading) ? 'Adding...' : 'Add'}</button>
                                <button type="button" onClick={closepopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default CategoryList
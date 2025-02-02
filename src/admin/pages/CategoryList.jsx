import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory, deleteCategory } from '../../slices/categorySlice';
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader/Loader';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const CategoryList = () => {

    const dispatch = useDispatch();
    const { categories, getCatLoading, getCatError } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const MAX_IMAGES = 1;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const [reviewImages, setReviewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isClickedFooterTwo, setIsClickedFooterTwo] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);


    const handleClickFooter = (categoryId) => {
        setCategoryId(categoryId);
        setIsClickedFooter(true);
    };
    const handleClickFooterTwo = (event) => {
        event.preventDefault();
        setIsClickedFooterTwo(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        setIsClickedFooterTwo(false);
        setCategoryId(null);
    };


    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Invalid file type. Only images are allowed.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                toast(<div className='flex center g5'> < NewReleasesIcon /> File size exceeds 10 MB.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
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
            toast(<div className='flex center g5'> < NewReleasesIcon /> You can only upload {MAX_IMAGES} image.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };
    const handleDeleteImage = (index) => {
        setPreviewImages((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
        setReviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;

        setIsSubmitted(true);

        try {
            const formData = new FormData();

            formData.append("name", DOMPurify.sanitize(event.target.name.value));
            reviewImages.forEach((file) => {
                formData.append("image", file);
            });
            const response = await dispatch(addCategory(formData)).unwrap();

            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getCategories());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error creating category!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setReviewImages([]);
            setPreviewImages([]);
            event.target.reset();
            setIsSubmitted(false);
            setIsClickedFooterTwo(false);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (isDeleted) return;
        setIsDeleted(true);
        try {
            const result = await dispatch(deleteCategory(categoryId)).unwrap();
            console.log(result);
            if (result.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Category deleted successfully</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setCategoryId(null);
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsDeleted(false);
            setIsClickedFooter(false);
        }
    };

    if (getCatLoading) {
        return <Loader />;
    }


    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">Category List</h1>
                <button onClick={handleClickFooterTwo}>Add New Category</button>
            </article>

            <div className="adminGrid">
                {getCatError ? (
                    <p className="text">Error loading categories...</p>
                ) : categories && categories.length > 0 ? (
                    categories.map((cat) => (
                        <Link to={`/dashboard/admin-category?query=${cat.name}`} className="adminGridItem" key={cat.id}>
                            <img src={cat.imageUrl} alt={cat.name} />
                            <p className="text">{cat.name}</p>
                            <DeleteIcon className='deleteIcon' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClickFooter(cat.id); }} />
                        </Link>
                    ))
                ) : (
                    <p className='text'>There are no categories!</p>
                )}
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleDelete}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Are you sure?</h2>

                            <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                <button type='submit' className="applyBtn" disabled={isDeleted}>{isDeleted ? 'Deleting...' : 'Yes'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className={`popup-btn ${isClickedFooterTwo ? 'clicked' : ''}`}>
                {isClickedFooterTwo && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Add New Category</h2>

                            <div className="pageBox5 flexcol center">
                                <input type="text" name="name" placeholder="Enter category name..." required />
                            </div>

                            <div className="pageBox5 flexcol center">
                                <label htmlFor="file-upload" className="upload-label">
                                    <UploadIcon />
                                    <span>Upload Images</span>
                                </label>
                                <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                                {previewImages && previewImages.length > 0 &&
                                    <div className="preview-container">
                                        {previewImages.map((image, index) => (
                                            <div className="preview-box" key={index}>
                                                <img src={image} alt={`Preview ${index}`} className="preview-image" />
                                                <span className="delete-icon"><DeleteForeverIcon onClick={() => handleDeleteImage(index)} /></span>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>

                            <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Adding...' : 'Add'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default CategoryList
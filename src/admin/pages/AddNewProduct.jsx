import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getCategory, getTags, clearErrors } from '../../slices/adminSlice';
import { showToast } from '../../assets/Schemas';
import DOMPurify from 'dompurify';

import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';


const AddNewProduct = () => {

    const dispatch = useDispatch();
    const { addLoading, addErrors, addError, tags, tagLoading, tagError, categories, catLoading, catError } = useSelector((state) => state.admin);
    const MAX_IMAGES = 5;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const [reviewImages, setReviewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const initialState = {
        tags: [],
        title: '',
        category: '',
        originalPrice: '',
        salePrice: '',
        stocks: '',
        information: ''
    };
    const [formData, setFormData] = useState(initialState);
    const fileInputRef = useRef(null);


    useEffect(() => {
        dispatch(getCategory());
        dispatch(getTags());
    }, [dispatch]);

    useEffect(() => {
        if (reviewImages.length === 0) {
            setPreviewImages([]);
        }
    }, [reviewImages]);


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
            showToast('error', `You can only upload up to ${MAX_IMAGES} images!`);
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
    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value.endsWith(" ") && value.trim() !== "") {
            handleTagSelect(value.trim());
            setSearchQuery("");
        } else {
            setSearchQuery(value);
        }
    };
    const handleTagSelect = (tagName) => {
        if (!selectedTags.includes(tagName)) {
            const updatedTags = [...selectedTags, tagName];

            setSelectedTags(updatedTags);
            setFormData(prevState => ({ ...prevState, tags: updatedTags }));
            dispatch(clearErrors());
        }
        setSearchQuery("");
    };
    const removeTag = (tagName) => {
        const updatedTags = selectedTags.filter(tag => tag !== tagName);

        setSelectedTags(updatedTags);
        setFormData(prevState => ({ ...prevState, tags: updatedTags }));
    };
    const filteredTags = tags?.filter(tag =>
        tag.tagName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getProError = (field) => Array.isArray(addErrors) ? addErrors.find(error => error.path === field) : null;
    const tagsError = getProError('tags');
    const titleError = getProError('title');
    const categoryError = getProError('category');
    const originalPriceError = getProError('originalPrice');
    const salePriceError = getProError('salePrice');
    const stocksError = getProError('stocks');
    const informationError = getProError('information');

    const productSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (reviewImages.length < 2) {
            showToast('error', 'You have to upload at least 2 images!');
            return;
        }
        if (tagsError || titleError || categoryError || originalPriceError || salePriceError || stocksError || informationError) {
            showToast('error', 'Please fix the errors before submitting the form!');
            return;
        }
        setIsSubmitting(true);

        try {
            const productData = new FormData();

            const sanitizedTags = formData.tags.map(tag => DOMPurify.sanitize(tag.trim())).filter(tag => tag !== '');
            sanitizedTags.forEach(tag => productData.append("tags[]", tag));

            productData.append("title", DOMPurify.sanitize(formData.title));
            productData.append("category", DOMPurify.sanitize(formData.category));
            productData.append("originalPrice", parseFloat(formData.originalPrice));
            productData.append("salePrice", parseFloat(formData.salePrice));
            productData.append("stocks", parseFloat(formData.stocks));
            productData.append("information", DOMPurify.sanitize(formData.information));

            reviewImages.forEach((file) => {
                productData.append("images", file);
            });

            const response = await dispatch(addProduct(productData)).unwrap();

            if (response.status === "success") {
                showToast('success', `${response.message}`);
                previewImages.forEach((url) => URL.revokeObjectURL(url));
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setFormData(initialState);
                setReviewImages([]);
                setPreviewImages([]);
                setSelectedTags([]);
                setSearchQuery("");
                dispatch(getTags());
            } else {
                showToast('error', `${response.message}`);
            }

        } catch (error) {
            showToast('error', 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Fragment>
            <article className='w100 flex center-start'><h1 className='heading'>Add New Product</h1></article>

            <form onSubmit={productSubmit} className='productForm'>

                <div className="flexcol start-center w100 g5">
                    <p className="text">Add Tags</p>
                    {selectedTags?.length > 0 && <div className="selectedTags">
                        {selectedTags.map((tag) => (
                            <div key={tag} className="selected-item">
                                {tag} <ClearIcon onClick={() => removeTag(tag)} />
                            </div>
                        ))}
                    </div>}
                    <input type="text" name="tags" placeholder="Search product tags..." autoComplete='off' value={searchQuery} onChange={handleSearchChange} />
                    {searchQuery && filteredTags.length > 0 ? (
                        <div className="suggestions">
                            {filteredTags.map((tag) => (
                                <div key={tag._id} className="suggestion-item" onClick={() => handleTagSelect(tag.tagName)}>
                                    {tag.tagName}
                                </div>
                            ))}
                        </div>
                    ) : searchQuery ? (
                        <p className="text">No tags found!</p>
                    ) : null}
                    {tagsError && <p className="error">{tagsError.msg}</p>}
                </div>

                <div className="flexcol start-center w100 g5">
                    <p className="text">Product Name</p>
                    <input type="text" name='title' placeholder='Enter product name...' value={formData.title} onChange={handleChange} />
                    {titleError && <p className="error">{titleError.msg}</p>}
                </div>

                <div className="flexcol start-center w100 g5">
                    <p className="text">Select Category</p>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select category</option>
                        {catLoading ? (
                            <option value="">Loading categories...</option>
                        ) : catError ? (
                            <option value="">Error loading categories...</option>
                        ) : categories && categories.length > 0 ? (
                            categories.map((cat) => (
                                <option style={{ textTransform: 'capitalize' }} key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
                            ))
                        ) : (
                            <option value="">No categories found!</option>
                        )}
                    </select>
                    {categoryError && <p className="error">{categoryError.msg}</p>}
                </div>

                <div className="flexcol start-center w100 g5">
                    <p className="text">Original Price</p>
                    <input type="number" name='originalPrice' placeholder='Enter original price...' value={formData.originalPrice} onChange={handleChange} />
                    {originalPriceError && <p className="error">{originalPriceError.msg}</p>}
                </div>
                <div className="flexcol start-center w100 g5">
                    <p className="text">Sale Price</p>
                    <input type="number" name='salePrice' placeholder='Enter sale price...' value={formData.salePrice} onChange={handleChange} />
                    {salePriceError && <p className="error">{salePriceError.msg}</p>}
                </div>
                <div className="flexcol start-center w100 g5">
                    <p className="text">Product Stock</p>
                    <input type="number" name='stocks' placeholder='Enter product stock...' value={formData.stocks} onChange={handleChange} />
                    {stocksError && <p className="error">{stocksError.msg}</p>}
                </div>
                <div className="flexcol start-center w100 g5">
                    <p className="text">Product Information</p>
                    <textarea name="information" placeholder='Enter product information...' data-gramm="false" value={formData.information} onChange={handleChange} />
                    {informationError && <p className="error">{informationError.msg}</p>}
                </div>

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
                {addError && <p className="error">{addError}</p>}
                <button type='submit' disabled={isSubmitting || addLoading}>{(isSubmitting || addLoading) ? 'Adding...' : 'Add'}</button>
            </form>
        </Fragment>
    )
}

export default AddNewProduct


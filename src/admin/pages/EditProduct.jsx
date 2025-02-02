import React, { useState, Fragment, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../slices/categorySlice';
import { fetchProductDetails, deleteImage, updateProduct } from '../../slices/productSlice';
import DOMPurify from 'dompurify';
import Loader from '../../components/Loader/Loader';
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CachedIcon from '@mui/icons-material/Cached';


const EditProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { categories, getCatLoading, getCatError } = useSelector((state) => state.category);
    const { pDetails, pdLoading, pdError } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductDetails(id));
        dispatch(getCategories());
    }, [dispatch, id]);

    const MAX_IMAGES = 5;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const images = pDetails?.image?.map((img) => ({ imageId: img.imageId, url: img.imageUrl })) || [];
    const imageSpace = 5 - images.length;

    const [reviewImages, setReviewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isDeleted, setIsDeleted] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formValues, setFormValues] = useState({
        name: "",
        categoryPath: "",
        originalPrice: 0,
        salePrice: 0,
        stock: 0,
        info: "",
    });

    useEffect(() => {
        if (pDetails) {
            setFormValues({
                name: pDetails.name || "",
                categoryPath: pDetails.selectedSupOption || "",
                originalPrice: pDetails.originalPrice || 0,
                salePrice: pDetails.salePrice || 0,
                stock: pDetails.stock || 0,
                info: pDetails.info || "",
            });
        }
    }, [pDetails]);

    //image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Invalid file type. Only images are allowed.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                toast(<div className='flex center g5'><NewReleasesIcon /> </div>, {
                    duration: 3000,
                    position: 'top-center',
                    style: { color: 'red' },
                });
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


        if (filesToAdd.length + reviewImages.length > imageSpace) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> You can't upload more than {imageSpace} images.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }

        const previews = filesToAdd.map((file) => URL.createObjectURL(file));

        setReviewImages((prev) => [...prev, ...filesToAdd]);
        setPreviewImages((prev) => [...prev, ...previews]);
    };

    const handleDeleteImage = (index) => {
        setPreviewImages((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
        setReviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteImageTwo = async (imageId) => {
        if (isDeleted[imageId]) return;
        setIsDeleted((prevState) => ({ ...prevState, [imageId]: true }));
        try {
            const { status } = await dispatch(deleteImage(imageId)).unwrap();
            if (status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Image deleted sucessfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(fetchProductDetails(id));
            }
        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error deleting Image!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsDeleted((prevState) => ({ ...prevState, [imageId]: false }));
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const productSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (images?.length + reviewImages?.length < 2) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> You have to upload at least 2 images.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append(
                "productData",
                JSON.stringify({
                    name: DOMPurify.sanitize(formValues.name),
                    categoryPath: DOMPurify.sanitize(formValues.categoryPath),
                    originalPrice: parseFloat(formValues.originalPrice),
                    salePrice: parseFloat(formValues.salePrice),
                    stock: parseFloat(formValues.stock),
                    info: DOMPurify.sanitize(formValues.info),
                })
            );
            formData.append("productId", id);
            if (reviewImages?.length > 0) {
                reviewImages.forEach((file) => {
                    formData.append("productImage", file);
                });
            }

            const result = await dispatch(updateProduct(formData)).unwrap();
            if (result.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> {"Product updated successfully!"}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                navigate('/dashboard/product-list');
            }

        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setReviewImages([]);
            setPreviewImages([]);
            setIsSubmitting(false);
        }
    };



    const back = () => {
        navigate('/dashboard/product-list');
    }



    return (
        <Fragment>
            <div className="backSection">
                <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Edit Product</h1>
            </div>

            {pdLoading ? (
                <Loader />
            ) : pdError ? (
                <p>Error loading product details!</p>
            ) : pDetails && (
                <form onSubmit={productSubmit} className='productForm'>
                    <div className="flexcol g10 start-center wh">
                        <p className="text">Product Name</p>
                        <input type="text" name='name' value={formValues.name} onChange={handleInputChange} placeholder='Enter product name' required />
                    </div>
                    <div className="flexcol g10 start-center wh">
                        <p className="text">Select Category</p>
                        <select name="categoryPath" value={formValues.categoryPath} onChange={handleInputChange} required>
                            {getCatLoading ? (
                                <option value="">Loading categories...</option>
                            ) : getCatError ? (
                                <option value="">Error loading categories...</option>
                            ) : categories && categories.length > 0 ? (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))
                            ) : (
                                <option value="">There are no categories!</option>
                            )}
                        </select>
                    </div>
                    <div className="flexcol g10 start-center wh">
                        <p className="text">Original Price</p>
                        <input type="number" name='originalPrice' value={formValues.originalPrice} onChange={handleInputChange} placeholder='Enter original price (₹)' required />
                    </div>
                    <div className="flexcol g10 start-center wh">
                        <p className="text">Sale Price</p>
                        <input type="number" name='salePrice' value={formValues.salePrice} onChange={handleInputChange} placeholder='Enter sale price (₹)' required />
                    </div>
                    <div className="flexcol g10 start-center wh">
                        <p className="text">Product Stock</p>
                        <input type="number" name='stock' value={formValues.stock} onChange={handleInputChange} placeholder='Enter product stock' required />
                    </div>
                    <div className="flexcol g10 start-center wh">
                        <p className="text">Product Information</p>
                        <textarea name="info" value={formValues.info} onChange={handleInputChange} placeholder='Enter product information' required />
                    </div>

                    <div className="preview-container">
                        {images && images.map((image, index) => (
                            <div className="preview-box" key={index}>
                                <img src={image.url} alt={`Preview ${index}`} className="preview-image" />
                                <button className="delete-icon" onClick={() => handleDeleteImageTwo(image.imageId)} disabled={isDeleted[image.imageId]}>
                                    {isDeleted[image.imageId] ? <CachedIcon className='loading' /> : <DeleteForeverIcon />}
                                </button>
                            </div>
                        ))}
                        {previewImages && previewImages.length > 0 && previewImages.map((image, index) => (
                            <div className="preview-box" key={index}>
                                <img src={image} alt={`Preview ${index}`} className="preview-image" />
                                <button className="delete-icon"><DeleteForeverIcon onClick={() => handleDeleteImage(index)} /></button>
                            </div>
                        ))}
                    </div>
                    <label htmlFor="file-upload" className="upload-label">
                        <UploadIcon />
                        <span>Upload Images</span>
                    </label>
                    <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />

                    <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update'}</button>
                </form>
            )}

        </Fragment>
    )
}

export default EditProduct
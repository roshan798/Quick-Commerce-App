import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import Button from '../../components/shared/Button';
import { Trash2, Upload, X } from 'lucide-react';
import { ApiResponse, ImageUploadResultDTO, Product } from '../../types';
import { getProductById } from '../../http/product';
import { deleteImageById, uploadImage } from '../../http/admin/images';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILE_COUNT = 5; // Maximum number of files
const MAX_FILE_COUNT_MESSAGE = `You can upload a maximum of ${MAX_FILE_COUNT} files.`;
const MAX_FILE_SIZE_MESSAGE = `File size should not exceed ${MAX_FILE_SIZE / 1024 / 1024} MB.`;

type Image = {
    url: string;
};

const ManageImages = () => {
    const { productId } = useParams<{ productId: string }>();

    const { register, handleSubmit, reset, watch } = useForm<{
        images: FileList;
    }>();
    const [serverImages, setServerImages] = useState<Image[]>([]); // State for server images
    const [formImages, setFormImages] = useState<File[]>([]); // State for form-selected images
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const selectedFiles = watch('images');

    useEffect(() => {
        // Fetch existing images from the server when the component mounts
        const fetchImages = async () => {
            try {
                const response: AxiosResponse<ApiResponse<Product>> =
                    await getProductById(parseInt(productId!));
                if (
                    response.data.data.images &&
                    response.data.data.images.length > 0
                ) {
                    const imageUrls = response.data.data.images.map(
                        (img): Image => {
                            return { url: img };
                        }
                    );
                    setServerImages(imageUrls); // Set the server images state
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [productId]);

    // Handle file selection (append selected files to the form state)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessages([]); // Reset previous errors
        const newFiles = event.target.files;
        if (newFiles) {
            const updatedFiles = [...formImages, ...Array.from(newFiles)];

            // Make sure we don't exceed the maximum file count
            if (updatedFiles.length <= MAX_FILE_COUNT) {
                setFormImages(updatedFiles);
                const dataTransfer = new DataTransfer();
                updatedFiles.forEach((file) => dataTransfer.items.add(file));
                reset({ images: dataTransfer.files });
            } else {
                setErrorMessages((prev) => [...prev, MAX_FILE_COUNT_MESSAGE]);
            }
        }
    };

    // Upload images with validation
    const onUpload = async (data: { images: FileList }) => {
        console.log('onUpload method executed. Uploading images:', data.images);
        setErrorMessages([]); // Reset previous errors

        if (!data.images.length) return;

        // Check number of files
        if (data.images.length > MAX_FILE_COUNT) {
            setErrorMessages((prev) => [...prev, MAX_FILE_COUNT_MESSAGE]);
            return;
        }

        // Check each file size
        for (const file of data.images) {
            if (file.size > MAX_FILE_SIZE) {
                setErrorMessages((prev) => [...prev, MAX_FILE_SIZE_MESSAGE]);
                return;
            }
        }

        const formData = new FormData();
        for (const file of data.images) {
            formData.append('files', file);
        }

        setUploading(true);
        try {
            console.log('Uploading to server...');

            const response: AxiosResponse<ApiResponse<ImageUploadResultDTO[]>> =
                await uploadImage(
                    parseInt(productId!),
                    formData,
                    (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            );
                            setUploadProgress(percent);
                        }
                    }
                );
            console.log('Upload successful, response:', response.data);
            const errors = response.data.data
                .filter((img) => !img.success)
                .map(
                    (img) =>
                        `Failed to upload ${img.fileName} : ${img.errorMessage}`
                );
            setServerImages((prev) => {
                const newImages = response.data.data
                    .filter((img) => img.success)
                    .map((img) => {
                        return { url: img.imageUrl! };
                    });

                if (errors !== undefined && errors.length > 0) {
                    const filteredErrors = errors.filter(
                        (error): error is string => error !== undefined
                    );
                    setErrorMessages(filteredErrors);
                }

                return [...prev, ...newImages];
            });

            // Append new images to the existing images list
            const dataTransfer = new DataTransfer();
            reset({ images: dataTransfer.files });
            setFormImages([]);

            // Reset the form after upload is complete
            setUploadProgress(0);
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (img: string, idx: number) => {
        const imagePath = img.split('/').slice(-3);
        try {
            const res = await deleteImageById(
                parseInt(imagePath[1]),
                imagePath[2]
            );
            setServerImages((prev) => prev.filter((_, i) => i !== idx));
            console.log('Image deleted successfully:', res.data);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Image List */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold mb-6  text-left  text-indigo-900">
                    Product Images
                </h1>
                <ProductImages
                    images={serverImages}
                    handleDeleteImage={handleDeleteImage}
                />
            </div>

            <div>
                <h1 className="text-2xl font-semibold mb-6 text-left  text-indigo-900">
                    Upload Images
                </h1>
                {/* Upload Form */}

                <form
                    onSubmit={handleSubmit(onUpload)}
                    className="mb-8 flex flex-col gap-6"
                >
                    {/* Drag Area */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50">
                        <p className="text-gray-600 font-semibold text-lg">
                            Drop files here
                        </p>
                        <span className="text-gray-400 my-2">Or</span>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            {...register('images')}
                            onChange={handleFileChange}
                            accept="image/*"
                            multiple
                        />

                        <label htmlFor="file-upload">
                            <Button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById('file-upload')
                                        ?.click()
                                }
                                icon={<Upload size={18} color="gray" />}
                                className="px-4 py-2 *:text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-100 cursor-pointer transition-all duration-200"
                            >
                                Browse
                            </Button>
                        </label>
                    </div>

                    {/* Error Messages */}
                    {errorMessages.length > 0 && (
                        <div className="text-red-500">
                            {errorMessages.map((msg, idx) => (
                                <p key={idx} className="text-sm">
                                    {msg}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Selected Files */}
                    {selectedFiles && selectedFiles.length > 0 && (
                        <div className="flex flex-col gap-4 p-4">
                            {uploading && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-700 mb-1">
                                        Uploading: {uploadProgress}%
                                    </p>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-indigo-600 h-4 rounded-full transition-all duration-200"
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {Array.from(selectedFiles).map((file, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    {/* File name */}
                                    <span className="text-gray-800 text-sm font-medium truncate w-32">
                                        {file.name}
                                    </span>

                                    {/* Preview image */}
                                    <picture>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Preview"
                                            className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                        />
                                    </picture>

                                    {/* File size */}
                                    <span className="text-gray-500 text-xs">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </span>

                                    {/* Remove button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newFiles = Array.from(
                                                selectedFiles
                                            ).filter((_, i) => i !== idx);
                                            const dataTransfer =
                                                new DataTransfer();
                                            newFiles.forEach((file) =>
                                                dataTransfer.items.add(file)
                                            );
                                            reset({
                                                images:
                                                    dataTransfer.files.length >
                                                    0
                                                        ? dataTransfer.files
                                                        : undefined,
                                            });
                                            setFormImages((prev) =>
                                                prev.filter((_, i) => i !== idx)
                                            );
                                        }}
                                        className="cursor-pointer text-indigo-600 hover:text-red-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upload Button */}
                    <Button
                        type="submit"
                        disabled={uploading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                        icon={<Upload size={18} />}
                    >
                        {uploading ? 'Uploading...' : 'Send File'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ManageImages;

type ProductImagesProps = {
    images: Image[];
    handleDeleteImage: (img: string, idx: number) => void;
};

const ProductImages = ({ images, handleDeleteImage }: ProductImagesProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {images && images.length > 0 ? (
                images.map((img, idx) => (
                    <div key={idx} className="relative group">
                        <img
                            src={BASE_URL + img.url}
                            alt="Uploaded"
                            className="w-full h-40 object-cover rounded-md "
                        />
                        <button
                            onClick={() => {
                                handleDeleteImage(img.url, idx);
                            }}
                            className="absolute cursor-pointer top-2 right-2 bg-white p-1 rounded-full shadow shadow-black hover:bg-red-500 hover:text-white transition"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-full">
                    No images available.
                </p>
            )}
        </div>
    );
};

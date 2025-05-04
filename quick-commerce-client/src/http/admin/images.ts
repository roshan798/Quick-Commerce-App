import { AxiosProgressEvent } from 'axios';
import CONFIG from '../../config.ts';
import api from '../index.ts';
const url = CONFIG.IMAGES;

const IMAGES = {
    deleteIamge: (productId: number, fileName: string) =>
        `${url}/${productId}/${fileName}`,
    uploadImage: (productId: number) => `${url}/upload/${productId}`,
};

export const deleteImageById = (productId: number, imageName: string) => {
    return api.delete(IMAGES.deleteIamge(productId, imageName));
};

export const uploadImage = (
    productId: number,
    files: FormData,
    onUploadProgress: ((progressEvent: AxiosProgressEvent) => void) | undefined
) => {
    return api.post(IMAGES.uploadImage(productId), files, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
    });
};

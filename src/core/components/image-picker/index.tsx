import React, { Component } from 'react';
import styledComponents from 'styled-components';
import Dropzone, { DropzoneRootProps, DropzoneInputProps, DropzoneState } from 'react-dropzone';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
    IImagePicker,
} from './types';

import photoIcon from '@/assets/img/photo.svg';

class ImagePickerLayout extends Component<IOwnProps, IOwnState> implements IImagePicker {

    readonly state: IOwnState = {
        loadedImage: '',
    };

    onDropHandler = (files: Array<File>): void => {
        if (files.length > 0) {
            const { onDrop } = this.props;
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) this.setState({loadedImage: reader.result as string});
            };
            reader.readAsDataURL(files[0]);
            onDrop(files[0]);
        }
    }

    renderDp = (
        acceptedFiles: Array<File>,
        getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps,
        getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps,
    ) => {
        const {className, onDrop, isLoading, currentImage, ...others} = this.props;
        const { loadedImage } = this.state;
        const imagePickerClass =
            loadedImage || currentImage ? `image-picker_loaded` : '';

        return (
            <div {...getRootProps()} className={`${className} image-picker ${imagePickerClass}`} {...others}>
                <input {...getInputProps()} />
                <img
                    src={loadedImage ? loadedImage : currentImage ? currentImage : photoIcon}
                    alt='selected'
                />
                <button className={`${className} image-picker__button`} type='button' />
            </div>
        );
    }

    render() {
        const {isLoading} = this.props;
        return (
            <Dropzone
                preventDropOnDocument={true}
                onDrop={this.onDropHandler}
                multiple={false}
                disabled={isLoading}
            >
                {(state: DropzoneState) => this.renderDp(state.acceptedFiles, state.getRootProps, state.getInputProps)}
            </Dropzone>
        );
    }
  }

export const ImagePicker = styledComponents(ImagePickerLayout)`${styles}`;

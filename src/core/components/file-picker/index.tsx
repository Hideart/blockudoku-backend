import React, { Component } from 'react';
import styledComponents from 'styled-components';
import Dropzone, { DropzoneRootProps, DropzoneInputProps, DropzoneState } from 'react-dropzone';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
    IImagePicker,
} from './types';

import fileIcon from '@/assets/img/upload.svg';
import done from '@/assets/img/done.svg';

class FilePickerLayout extends Component<IOwnProps, IOwnState> implements IImagePicker {

    readonly state: IOwnState = {
        loaded: '',
    };

    onDropHandler = (files: Array<File>): void => {
        if (files.length > 0) {
            const { onDrop } = this.props;
            onDrop(files);
        }
    }

    renderDp = (
        acceptedFiles: Array<File>,
        getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps,
        getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps,
    ) => {
        const {className, onDrop, isLoading, currentImage, ...others} = this.props;
        const { loaded } = this.state;

        return (
            <div {...getRootProps()} className={`${className} file-picker`} {...others}>
                <input {...getInputProps()} />
                <img
                    src={loaded ? done : fileIcon}
                    alt='upload file'
                />
                <p>{loaded  ? 'loaded' : 'You can drop your csv - files here'}</p>
            </div>
        );
    }

    render() {
        const {isLoading, multiple} = this.props;
        return (
            <Dropzone
                preventDropOnDocument={true}
                onDrop={this.onDropHandler}
                multiple={multiple}
                disabled={isLoading}
            >
                {(state: DropzoneState) => this.renderDp(state.acceptedFiles, state.getRootProps, state.getInputProps)}
            </Dropzone>
        );
    }
  }

export const FilePicker = styledComponents(FilePickerLayout)`${styles}`;

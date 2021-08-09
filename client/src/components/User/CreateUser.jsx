import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {parsePhoneNumberFromString} from 'libphonenumber-js'
import {useSelector} from 'react-redux';

import infoIcon from '../../assets/info-icon.png';

import {
    UserWrapper,
    UserContainer,
    UserFirstSection,
    UserSecondSection,
    UserSectionTitle,
    InfoIcon,
} from './CreateUser.style';

import {
    FileLabel,
    HelperText,
    Input,
    Label,
    Select
} from "../Inputs/CreateInputs.style";

import {createSchema} from "../../validators/user-schema";
import {createUser} from "../../actions/user";

import CreateHeader from '../Header/CreateHeader';

const CreateUser = () => {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

    const adminAccess = useSelector(({roleReducer: {adminAccess}}) => adminAccess);

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(createSchema),
    });

    const normalizePhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (!phoneNumber) {
            return value
        }

        return (
            phoneNumber.formatInternational()
        );
    };

    const sendData = async (data) => {
        setPreview(null);
        const formData = new FormData();

        for (let key in data) {
            if (key === 'avatar') {
                console.log(data[key])
                formData.append(key, data[key][0])
            }
            formData.append(key, data[key])
        }

        await createUser(formData);
        reset();
    };

    return (
        <UserWrapper>
            <CreateHeader title='Create Internal User' form='create-form'/>

            <form id={'create-form'} onSubmit={handleSubmit(sendData)} noValidate>
                <UserContainer>
                    <UserFirstSection>
                        <UserSectionTitle>General</UserSectionTitle>

                        <Label>Profile Picture</Label>
                        <Input
                            style={{display: 'none'}}
                            {...register('avatar')}
                            id='avatar'
                            type='file'
                            accept='image/*'
                            onInput={(event) => {
                                const file = event.target.files[0];
                                console.log(event.target.files[0])
                                if (file) {
                                    setImage(file);
                                } else {
                                    setImage(null);
                                }
                            }}
                        />
                        <FileLabel style={{backgroundImage: `url(${preview})`}} htmlFor='avatar'/>

                        <Label>First Name</Label>
                        {errors?.firstname?.message && <HelperText>{errors?.firstname?.message}</HelperText>}
                        <Input
                            {...register('firstname', {required: true})}
                            id='firstname'
                            type='text'
                            required={errors?.firstname}
                        />

                        <Label>Last Name</Label>
                        {errors?.lastname?.message && <HelperText>{errors?.lastname?.message}</HelperText>}
                        <Input
                            {...register('lastname', {required: true})}
                            id='lastname'
                            type='text'
                            required={errors?.lastname}
                        />

                        <Label>Email</Label>
                        {errors?.email?.message && <HelperText>{errors?.email?.message}</HelperText>}
                        <Input
                            {...register('email', {required: true})}
                            id='email'
                            type='email'
                            required={errors?.email}
                        />

                        <Label>Phone</Label>
                        {errors?.phone?.message && <HelperText>{errors?.phone?.message}</HelperText>}
                        <Input
                            {...register('phone', {required: true})}
                            id='phone'
                            type='tel'
                            onChange={(event) => {
                                event.target.value = normalizePhoneNumber(event.target.value);
                            }}
                        />

                    </UserFirstSection>

                    <UserSecondSection>
                        <UserSectionTitle>
                            Role & Permissions
                            <span>
                                <InfoIcon src={infoIcon} alt="infoIcon"/>
                                <div>
                                    <p>1. Admin</p>
                                    <p>Can create/manage internal/external users, set Sedcards App limits for clients,
                                    set Budget/Client CPM visibility for Employees.</p>
                                    <p>2. Manager</p>
                                    <p>Can create/manage internal/external users, but not internal Admins, set Sedcards
                                    App limits for clients, set Budget/Client CPM visibility for Employees.</p>
                                    <p>3. Employees</p>
                                    <p>Can see internal/external users, edit his own profile, see Budget/Client CPMs
                                    when allowed.</p>
                                </div>
                            </span>
                        </UserSectionTitle>

                        <Label>Role</Label>
                        {errors?.role?.message && <HelperText>{errors?.role?.message}</HelperText>}
                        <Select
                            {...register('role', {required: true})}
                            id='role'
                            type='select'
                            required={errors?.role}
                        >
                            {/*<option value='' disabled selected hidden>Select...</option>*/}
                            {adminAccess && <option value='admin'>Admin</option>}
                            <option value='manager'>Manager</option>
                            <option value='employee'>Employee</option>
                        </Select>

                        <UserSectionTitle>Password</UserSectionTitle>

                        <Label>Set Password</Label>
                        {errors?.password?.message && <HelperText>{errors?.password?.message}</HelperText>}
                        <Input
                            {...register('password', {required: true})}
                            id='password'
                            type='password'
                            required={errors?.password}
                        />

                    </UserSecondSection>
                </UserContainer>
            </form>

        </UserWrapper>
    );
};

export default CreateUser;

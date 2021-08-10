import * as yup from 'yup';

const createSchema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
        .required('First name is a required field'),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
        .required('Last name is a required field'),
    profession: yup
        .string()
        .required('Profession is a required field'),
    birthdate: yup
        .date()
        .notRequired(),

    instagram: yup
        .string()
        .notRequired()
        .when('instagramFollowers', {
            is: String,
            then: yup.string().required()
        }),
    instagramFollowers: yup
        .string()
        .notRequired()
        .when('instagram', {
            is: String,
            then: yup.string().required()
        }),

    youtube: yup
        .string()
        .notRequired()
        .when('youtubeFollowers', {
            is: String,
            then: yup.string().required()
        }),
    youtubeFollowers: yup
        .string()
        .notRequired()
        .when('youtube', {
            is: String,
            then: yup.string().required()
        }),

    facebook: yup
        .string()
        .notRequired()
        .when('facebookFollowers', {
            is: String,
            then: yup.string().required()
        }),
    facebookFollowers: yup
        .string()
        .notRequired()
        .when('facebook', {
            is: String,
            then: yup.string().required()
        }),

    tiktok: yup
        .string()
        .notRequired()
        .when('tiktokFollowers', {
            is: String,
            then: yup.string().required()
        }),
    tiktokFollowers: yup
        .string()
        .notRequired()
        .when('tiktok', {
            is: String,
            then: yup.string().required()
        }),

    twitter: yup
        .string()
        .notRequired()
        .when('twitterFollowers', {
            is: String,
            then: yup.string().required()
        }),
    twitterFollowers: yup
        .string()
        .notRequired()
        .when('twitter', {
            is: String,
            then: yup.string().required()
        }),

    blog: yup
        .string()
        .notRequired()
        .when('blogFollowers', {
            is: String,
            then: yup.string().required()
        }),
    blogFollowers: yup
        .string()
        .notRequired()
        .when('blog', {
            is: String,
            then: yup.string().required().matches(/(\$[0-9.]+(\.[0-9]{2})?)/)
        }),
}, [
    ['instagram', 'instagramFollowers'],
    ['youtube', 'youtubeFollowers'],
    ['facebook', 'facebookFollowers'],
    ['tiktok', 'tiktokFollowers'],
    ['twitter', 'twitterFollowers'],
    ['blog', 'blogFollowers'],
]);

export {
    createSchema
};

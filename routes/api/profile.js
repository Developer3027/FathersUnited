const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status('500').send('Server Error');
    }
});

// @route   Post api/profile
// @desc    create or update a profile
// @access  Private

router.post('/', [ auth, [
    check('firstname', 'First Name is required')
        .not()
        .isEmpty(),
    check('lastname', 'Last Name is required')
        .not()
        .isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstname,
        lastname,
        address,
        city,
        state,
        mobile,
        status,
        skills,
        bio,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;
    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if(firstname) profileFields.firstname = firstname;
    if(lastname) profileFields.lastname = lastname;
    if(address) profileFields.address = address;
    if(city) profileFields.city = city;
    if(state) profileFields.state = state;
    if(mobile) profileFields.mobile = mobile;
    if(status) profileFields.status = status;
    if(bio) profileFields.bio = bio;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    
    try{
        let profile = await Profile.findOne({ user: req.user.id});

        if(profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route   GET api/profile
// @desc    GET all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }catch(err) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profile/user/:user_id
// @desc    GET profile by id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'No profile found' });
        }
        res.json(profile);

    }catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'No profile found' });
        }
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile
// @desc    DELETE profile, user and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove users posts

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove the User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    }catch(err) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth,[
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);

    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    }catch(err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', err });
    }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth,[
    check('school', 'School is required')
        .not()
        .isEmpty(),
    check('degree', 'Degree is required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);

    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    }catch(err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', err });
    }
});

module.exports = router;

const SpaceType = require('../models/SpaceType');
const {
    sendSuccess,
    sendCreated,
    sendError,
    sendErrorMessage,
    sendNotFound
} = require('../utils/response');

// Create
exports.createSpaceType = async (req, res) => {
    try {
        const spaceType = new SpaceType(req.body);
        await spaceType.save();
        sendSuccess(res, 'SpaceType added successfully', spaceType);
    } catch (error) {
        console.error('Create SpaceType Error:', error);
        sendError(res, 'Internal server error', error);
    }
};

// Read All
exports.getAllSpaceTypes = async (req, res) => {
    try {
        const spaceTypes = await SpaceType.find();
        sendSuccess(res, 'SpaceType fetched successfully', spaceTypes);
    } catch (error) {
        sendError(res, 'Internal server error', error);
    }
};

// Read One
exports.getSpaceTypeById = async (req, res) => {
    try {
        const spaceType = await SpaceType.findById(req.params.id);
        if (!spaceType) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        sendSuccess(res, 'Data fetched successfully', spaceType);
    } catch (error) {
        sendError(res, 'Internal server error', error);
    }
};

// Update
exports.updateSpaceType = async (req, res) => {
    try {
        const updated = await SpaceType.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        sendSuccess(res, 'Space Type Updated Successfully', updated);
    } catch (error) {
        sendError(res, 'Internal server error', error);
    }
};

// Delete
exports.deleteSpaceType = async (req, res) => {
    try {
        await SpaceType.findByIdAndDelete(req.params.id);
        sendSuccess(res, 'Deleted successfully');
    } catch (error) {
        sendError(res, 'Internal server error', error);
    }
};

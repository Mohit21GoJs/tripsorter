/**
 * HOF for handling common controller operations
 * @param {Function} controllerCb
 * @returns {Function}
 */
const BaseController = controllerCb => async (req, res, next) => {
  try {
    const response = await controllerCb(req, res, next);
    res.send(response);
  } catch (e) {
    // log error
    console.error('Error in controller -->', e);
    res.status(500).send({
      error: 'Something went wrong',
    });
  }
  return next();
};

export default BaseController;

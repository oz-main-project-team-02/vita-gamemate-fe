import * as service from './payments.service';

async function confirmPayment(req, res, next) {
  const confirmResponse = await service.confirmPayment(req.query);

  return res.json({ data: confirmResponse });
}

export default {
  confirmPayment,
};

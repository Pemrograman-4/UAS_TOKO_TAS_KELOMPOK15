const Model = require("../Model/model_tas");
const response = require("../Config/response");

exports.get = (data) =>
  new Promise((resolve, reject) => {
    Model.find().then((data) => {
      if (data.length == 0) {
        reject(response.errorResult());
      } else {
        resolve(
          Object.assign(response.suksesResult("Succes"), {
            data: data,
          })
        );
      }
    });
  });

exports.add = (data) =>
  new Promise((resolve, reject) => {
    Model.create(data)
      .then(() =>
        resolve(response.suksesResponse("Berhasil Menambah Data Tas"))
      )
      .catch(() =>
        reject(response.errorResponse("Gagal Menambah Data Tas"))
      );
  });

  // Delete data
exports.delete = async (req, res) => {
  try {
    await Model.findOneAndDelete({ _id: req.params.id });
    res.json(response.suksesResponse("Berhasil Menghapus Data"));
  } catch (error) {
    res.json(response.errorResponse("Gagal Menghapus Data"));
  }
};

// update data
exports.update = async (req, res) => {
  try {
    await Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        jam_operasional: req.body.jam_operasional,
        alamat: req.body.alamat,
        gerai: req.body.gerai,
        no_tlpn: req.body.no_tlpn,
      }
    );
    res.json(response.suksesResponse("Berhasil Update Data"));
  } catch (error) {
    res.json(response.errorResponse("Gagal Update Data"));
  }
};
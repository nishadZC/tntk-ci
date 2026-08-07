import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Progress from "../../components/UI/progress";
import { closeModal } from "../../redux/actions/modal";
import { addPdfFile } from "../../helpers/api";



export default function AddPDF({ user, reload}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    link: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    if (values.link) {
      setLoading(true);
      addPdfFile(values.link, user)
        .then((res) => {
          alert("PDF was generated");
          dispatch(closeModal());
          reload();
        })
        .catch((e) => {
          alert(e);
          dispatch(closeModal());
        });
    };
  };

  return (
    <Box>
      <h2 className="h2" style={{ marginBottom: 20, color: "#fff" }}>
        Add New Link to PDF
      </h2>

      <TextField
        label="Link"
        name="link"
        fullWidth
        variant="outlined"
        style={{ marginBottom: 20 }}
        value={values.link}
        onChange={onChange}
      />

      <Box display="flex" justifyContent="center" style={{ marginTop: 40 }}>
        {loading ? (
          <Progress />
        ) : (
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={{ width: 260 }}
            onClick={onSave}
          >
            Request new PDF
          </Button>
        )}
      </Box>
    </Box>
  );
}

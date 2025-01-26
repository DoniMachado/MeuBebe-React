import { Button, Eat, Sleep, Diaper, Grid, Appbar } from "../../Components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Context";
import { useTheme } from "@mui/material/styles";
import { get, save, update, remove } from "../../Services/supabase";
import { validateFields } from "../../Utils/validators";
import { actionTypeStr } from "../../Utils/core";
import { useNavigate } from "react-router-dom";

const FormView = () => {
  const { translate, showAlert, supabase, openDialog } = useAppContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const params = useParams();
  const actionType = params.type;
  const id = params.id;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getForm = (actionType) => {
    switch (actionType) {
      case "1":
        return <Sleep data={data} setData={setData} translate={translate} />;
      case "2":
        return <Eat data={data} setData={setData} translate={translate} />;
      case "3":
        return <Diaper data={data} setData={setData} translate={translate} />;
      default:
        return <Eat data={data} setData={setData} translate={translate} />;
    }
  };

  const loadData = async (id) => {
    if (id) {
      const action = await get("actions", supabase, [
        { field: "id", value: id },
      ]);
      setData(action);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      loadData(params.id);
    }
  }, []);

  async function confirmAction() {
    await remove("actions", supabase, id);
    showAlert(translate("delete-success"), "success");
    navigate("/");
  }

  async function cancelAction() {
    showAlert(translate("delete-cancel"), "warning");
  }

  return (
    <>
      <Appbar
        title={translate(actionTypeStr[actionType])}
        id={id}
        _delete={() => {
          openDialog(
            translate("delete-record"),
            translate("delete-confirm"),
            confirmAction,
            cancelAction
          );
        }}
      />
      <Grid
        container={true}
        spacing={2}
        sx={{
          marginTop: "1em",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {getForm(actionType)}
          <Button
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            onClick={async () => {
              try {
                const fields = validateFields(data, actionType);
                if (fields.length === 0) {
                  id
                    ? await update("actions", supabase, id, data)
                    : await save("actions", supabase, data);
                  showAlert(
                    `Item ${id ? "editado" : "criado"} com sucesso!`,
                    "success"
                  );
                  navigate("/");
                } else {
                  showAlert(
                    `Os campos ${fields
                      .map((x) => translate(x))
                      .join(", ")} são obrigatórios`,
                    "error"
                  );
                }
              } catch (error) {
                showAlert(
                  `Erro ao ${id ? "editar" : "criar"} item de registro: ` + err,
                  "error"
                );
              }
            }}
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            {translate("save")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormView;

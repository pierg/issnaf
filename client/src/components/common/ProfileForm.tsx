import {
    Box,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
} from "@pankod/refine-mui";

import { ProfileFormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const ProfileForm = ({
    register,
    handleSubmit,
    formLoading,
    onFinishHandler,
}: ProfileFormProps) => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Edit your profile
            </Typography>

            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Your Current Location
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("location", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Your Current Occupation
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("occupation", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            About
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            color="info"
                            style={{
                                width: "100%",
                                background: "transparent",
                                fontSize: "16px",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
                                color: "#919191",
                            }}
                            {...register("description", { required: false })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter your skills and interests separated by a comma
                        </FormHelperText>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("skills", { required: false })}
                        />
                    </FormControl>

                    <CustomButton
                        type="submit"
                        title={formLoading ? "Submitting..." : "Submit"}
                        backgroundColor="#5A98B9"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default ProfileForm;

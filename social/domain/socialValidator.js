const socialValidator = (userTag, userToFollowTag) => {

  let validation = true;
  let menssage = "";

  if (!userTag) {
    validation = false;
    menssage = "user tag is require";
    return { menssage, validation };
  };

  if (!userToFollowTag) {
    validation = false;
    menssage = "user tag to follow is require";
    return { menssage, validation };
  };

  return {validation, menssage};

}

module.exports = {
  socialValidator
}
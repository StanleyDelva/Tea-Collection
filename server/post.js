class Post{
    constructor(postKey, TeaType, TeaName, TeaImage, purchaseSite, Description="") {
        this.postKey = postKey;
        this.TeaType = TeaType;
        this.TeaName = TeaName;
        this.TeaImage = TeaImage;
        this.purchaseSite = purchaseSite;
        this.Description = Description;
    }
}

export default Post;
import React, { useEffect } from "react";
// styled-componentsを利用可能にする
import styled from "styled-components";

// apis
import { fetchRestaurants } from "../apis/restaurants";

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";

// divに対するスタイル
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`

const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`

// imgに対してスタイルを適用
const MainCover = styled.img`
  height: 600px;
`

export const Restaurants = () => {
  useEffect(() => {
    fetchRestaurants()
    .then((data) =>
      console.log(data)
    )
  }, [])

  return (
    <>
      <HeaderWrapper>
        {/* MainLogoImageの実態はimgタグなのでその後にsrcやaltを記述する */}
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
    </>
  )
}


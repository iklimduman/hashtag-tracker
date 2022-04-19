import React, { useEffect, useState } from "react";
import { getSingleWOEID } from "twitter-woeid";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";
import axios from "axios";
import { ZoomableGroup } from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    .range(["#ffedea", "#ff5233"]);

const WorldMap = ({ setTooltipContent }) => {
    console.log("re-render");
    const [data, setData] = useState([]);
    const mapWidth = 900;
    const mapHeight = 600;

    const handleFilter = ({ constructor: { name } }) => {
        return name !== "MouseEvent";
    };

    useEffect(() => {
        csv(`/countryData.csv`).then((data) => {
            setData(data);
        });
    }, []);

    const handleCountyClick = (properties) => {
        var woeid = [];
        woeid = getSingleWOEID(properties.NAME);

        if (woeid.length == 0) {
            woeid = getSingleWOEID(properties.NAME_LONG)
        }

        if (woeid[0].woeid) {
            getTrend(woeid[0].woeid).then((data) => console.log(data));
            //getTrend(woeid[0].woeid).then((data) => console.log(data[0].name));
        }
        else {
            setTooltipContent("No data available for this location")
        }
    }

    const getTrend = async (_id) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/trend/${_id}`);
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleMouseEnter = (properties) => {
        setTooltipContent(properties.NAME);
    }

    return (
        <div style={{ marginLeft: "auto", marginRight: "auto", fontSize: "1.25rem" }} data-tip="">

            <ComposableMap

                width={mapWidth}
                height={mapHeight}
                projectionConfig={{ scale: 160 }}
            >
                <ZoomableGroup
                    filterZoomEvent={handleFilter}
                    translateExtent={[[0, -mapHeight], [mapWidth, mapHeight]]}>
                    <Sphere stroke="#E4E5E6" strokeWidth={0.01} fill={"#266493"} />
                    <Graticule stroke="#E4E5E6" strokeWidth={0.1} />
                    {data.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {

                                    return (
                                        <Geography
                                            onClick={() => handleCountyClick(geo.properties)}
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                handleMouseEnter(geo.properties);
                                                //setTooltipContent(`${geo.properties.NAME}`);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("")
                                            }}

                                            style={{
                                                default: {
                                                    fill: "#122330",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.3,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: "#CFD8DC",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 1,
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: "#FF5722",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 1,
                                                    outline: "none",
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                    )}

                </ZoomableGroup>
            </ComposableMap>
        </div>

    );
};

export default React.memo(WorldMap);
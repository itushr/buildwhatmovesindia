import { NextResponse } from "next/server";
import { identify_authority } from "@/modules/authority";
import { getAuthorityServices } from "@/modules/get_authority_services";
import { select_service } from "@/modules/api_selection";
import { getService } from "@/modules/get_service_data";
import { data_presentation } from "@/modules/presentation_module";
import pool from "@/lib/db";

const steps = [
    { text: "Identify concerned public authority", status: "default", estimated: 13 },
    { text: "Find available government data sources", status: "default", estimated: 5 },
    { text: "Select most relevant data source", status: "default", estimated: 14 },
    { text: "Retrieve necessary information the source", status: "default", estimated: 5 },
    { text: "Convert raw data to presentable form", status: "default", estimated: 60 },
];

async function saveHistory(query, finalStep, status, details, errorMsg = null) {
    const stepsState = steps.map((s, idx) => {
        if (idx < finalStep) {
            return { ...s, status: "done" };
        } else if (idx === finalStep) {
            return { ...s, status: status === "success" ? "done" : "error" };
        } else {
            return { ...s, status: "default" };
        }
    });

    const data = {
        status: status, // "success" or "error"
        steps: stepsState,
        result: status === "success" ? details : null,
        error: status === "error" ? (errorMsg || details?.missing_points || "Error occurred while agents working") : null
    };

    try {
        const res = await pool.query(
            "INSERT INTO user_history (query, data) VALUES ($1, $2) RETURNING id",
            [query, JSON.stringify(data)]
        );
        return res.rows[0].id;
    } catch (dbErr) {
        console.error("Error saving user history in database:", dbErr);
        return null;
    }
}

export async function POST(request) {
    let query, step, context;
    try {
        const body = await request.json();
        query = body.query;
        step = body.step;
        context = body.context || {};

        if (!query || typeof query !== "string" || !query.trim()) {
            return NextResponse.json(
                { status: "error", error: "query is required" },
                { status: 400 }
            );
        }

        if (typeof step !== "number" || step < 0 || step > 4) {
            return NextResponse.json(
                { status: "error", error: "valid step (0-4) is required" },
                { status: 400 }
            );
        }

        query = query.trim();

        if (step === 0) {
            const authorityResult = await identify_authority(query);
            const authorityData = typeof authorityResult === "string" ? JSON.parse(authorityResult) : authorityResult;

            if (authorityData.jurisdiction === "state") {
                const errResult = {
                    is_relevant: true,
                    is_sufficient: true,
                    missing_points: null,
                    report_data: [
                        {
                            "type": "plain",
                            "content": "This matter falls under the State Government and not the Government of India. Please visit the RTI portal of the concerned State Government."
                        },]
                };
                const historyId = await saveHistory(query, 0, "success", errResult);
                return NextResponse.json({
                    status: "done",
                    step: 0,
                    error: null,
                    abort: true,
                    details: errResult,
                    historyId
                });
            }

            if (authorityData.jurisdiction !== "center") {
                const errResult = {
                    is_relevant: true,
                    is_sufficient: true,
                    missing_points: null,
                    report_data: [
                        {
                            "type": "plain",
                            "content": "This matter doesn't falls under the Government of India."
                        },]
                };
                const historyId = await saveHistory(query, 0, "success", errResult);
                return NextResponse.json({
                    status: "done",
                    step: 0,
                    error: null,
                    abort: true,
                    details: errResult,
                    historyId
                });
            }

            if (!authorityData.authority) {
                const errResult = {
                    is_relevant: true,
                    is_sufficient: true,
                    missing_points: null,
                    report_data: [
                        {
                            "type": "plain",
                            "content": "Concerned Public Authority is not registered on RTI portal!"
                        },]
                };
                const historyId = await saveHistory(query, 0, "success", errResult);
                return NextResponse.json({
                    status: "done",
                    step: 0,
                    error: null,
                    abort: true,
                    details: errResult,
                    historyId
                });
            }

            return NextResponse.json({
                status: "done",
                step: 0,
                details: authorityData
            });
        }

        if (step === 1) {
            const { authorityData } = context;
            if (!authorityData || !authorityData.authority || !authorityData.authority.id) {
                const errResult = {
                    is_relevant: true,
                    is_sufficient: true,
                    missing_points: null,
                    report_data: [
                        {
                            "type": "plain",
                            "content": "Concerned Public Authority is not registered on RTI portal!"
                        },]
                };
                const historyId = await saveHistory(query, 1, "success", errResult);
                return NextResponse.json({
                    status: "done",
                    step: 1,
                    abort: true,
                    error: null,
                    details: errResult,
                    historyId
                });
            }
            const authority_id = authorityData.authority.id;
            const services = await getAuthorityServices(authority_id);
            if (!services || services.length === 0) {
                const errResult = {
                    is_relevant: true,
                    is_sufficient: true,
                    missing_points: "",
                    report_data: [
                        {
                            "type": "plain",
                            "content": "The concerned authority has not added any data services yet!"
                        },]
                };
                const historyId = await saveHistory(query, 1, "success", errResult);
                return NextResponse.json({
                    status: "done",
                    step: 1,
                    error: null,
                    abort: true,
                    details: errResult,
                    historyId
                });
            }

            return NextResponse.json({
                status: "done",
                step: 1,
                details: services
            });
        }

        if (step === 2) {
            const { services } = context;
            if (!services || !Array.isArray(services)) {
                const errResult = {
                    is_relevant: true,
                    is_sufficient: true,
                    missing_points: "",
                    report_data: [
                        {
                            "type": "plain",
                            "content": "The concerned authority has not added any data services yet!"
                        },]
                };
                const historyId = await saveHistory(query, 2, "success", errResult);
                return NextResponse.json({
                    status: "done",
                    step: 2,
                    error: null,
                    abort: true,
                    details: errResult,
                    historyId
                });
            }
            const serviceResult = await select_service(services, query);
            const serviceData = typeof serviceResult === "string" ? JSON.parse(serviceResult) : serviceResult;

            if (!serviceData.service || !serviceData.service.endpoint) {
                const errResult = {
                    is_relevant: true,
                    is_sufficient: true,
                    missing_points: null,
                    report_data: [
                        {
                            "type": "plain",
                            "content": "Could not found data service that matches your query!"
                        },]
                };
                const historyId = await saveHistory(query, 2, "success", errResult);
                return NextResponse.json({
                    status: "done",
                    step: 2,
                    error: null,
                    abort: true,
                    details: errResult,
                    historyId
                });
            }

            return NextResponse.json({
                status: "done",
                step: 2,
                details: serviceData
            });
        }

        if (step === 3) {
            const { serviceData } = context;
            if (!serviceData || !serviceData.service || !serviceData.service.endpoint) {
                return NextResponse.json(
                    { status: "error", error: "serviceData with endpoint is required in context for step 3" },
                    { status: 400 }
                );
            }
            const { endpoint } = serviceData.service;
            const data = await getService(endpoint);
            return NextResponse.json({
                status: "done",
                step: 3,
                details: data
            });
        }

        if (step === 4) {
            const { data } = context;
            if (data === undefined) {
                return NextResponse.json(
                    { status: "error", error: "data is required in context for step 4" },
                    { status: 400 }
                );
            }
            if (data == null) {
                return NextResponse.json(
                    {
                        status: "error",
                        error: "data is required in context for step 4"
                    },
                    { status: 400 }
                );
            }
            const report = await data_presentation(data, query);
            const historyId = await saveHistory(query, 4, "success", report);
            return NextResponse.json({
                status: "done",
                step: 4,
                details: report,
                historyId
            });
        }

    } catch (error) {
        console.error(`Error in run-step at step ${step}:`, error);
        const historyId = await saveHistory(query || "Unknown Query", step || 0, "error", null, error.message || "Error occurred while agents working");
        return NextResponse.json(
            {
                status: "error",
                step: step || 0,
                error: error.message || "Error occurred while agents working",
                historyId
            },
            { status: 500 }
        );
    }
}
